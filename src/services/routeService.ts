import { RouteLeg, TravelMode, NavigationManeuver, Coordinates } from '../types/travel';
import { ALL_ROAD_LEGS, DAY1_ROAD_LEGS, DAY2_ROAD_LEGS } from './routeData';

// Cache for dynamic route calculations
const routeMemoryCache: Map<string, RouteLeg> = new Map();

/**
 * Maps travel mode to OSRM supported profile
 */
function getOsrmProfile(mode: TravelMode): 'walking' | 'driving' {
  if (mode === 'walking') return 'walking';
  // driving, two_wheeler, auto_taxi, transit fallback to road network
  return 'driving';
}

/**
 * Calculates a real road route using OSRM (Open Source Routing Machine)
 * Real road-following coordinates, distances, and maneuvers without simulated lines.
 */
export async function fetchOsrmRoute(
  origin: Coordinates,
  destination: Coordinates,
  mode: TravelMode,
  fromName: string,
  toName: string,
  legId: string
): Promise<RouteLeg | null> {
  const profile = getOsrmProfile(mode);
  const cacheKey = `${profile}-${origin.lat},${origin.lng}-${destination.lat},${destination.lng}`;

  if (routeMemoryCache.has(cacheKey)) {
    return routeMemoryCache.get(cacheKey)!;
  }

  try {
    const url = `https://router.project-osrm.org/route/v1/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=true`;
    
    // Set a sensible timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OSRM HTTP error: ${response.status}`);
    }

    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      return null;
    }

    const route = data.routes[0];
    const roadCoords: [number, number][] = route.geometry.coordinates.map(
      (c: [number, number]) => [c[1], c[0]] // convert [lng, lat] to [lat, lng]
    );

    const maneuvers: NavigationManeuver[] = [];
    if (route.legs && route.legs[0] && route.legs[0].steps) {
      for (const step of route.legs[0].steps) {
        if (step.maneuver && step.maneuver.instruction) {
          maneuvers.push({
            instruction: step.maneuver.instruction,
            distanceKm: Number((step.distance / 1000).toFixed(2)),
            durationMin: Math.max(1, Math.round(step.duration / 60)),
            streetName: step.name || 'Unnamed road'
          });
        }
      }
    }

    const distanceKm = Number((route.distance / 1000).toFixed(2));
    const durationMinutes = Math.max(1, Math.round(route.duration / 60));
    const travelParam = mode === 'walking' ? 'walking' : 'driving';
    const googleMapsNavUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&travelmode=${travelParam}`;

    const calculatedLeg: RouteLeg = {
      id: legId,
      fromStopId: '',
      toStopId: '',
      fromName,
      toName,
      travelMode: mode,
      distanceKm,
      durationMinutes,
      roadCoordinates: roadCoords,
      maneuvers: maneuvers.length > 0 ? maneuvers : [
        { instruction: `Follow road from ${fromName} to ${toName}`, distanceKm, durationMin: durationMinutes }
      ],
      googleMapsNavUrl
    };

    routeMemoryCache.set(cacheKey, calculatedLeg);
    return calculatedLeg;
  } catch (err) {
    console.warn(`OSRM dynamic routing request error (falling back to verified road data):`, err);
    return null;
  }
}

/**
 * Retrieve verified road route leg with fallback
 */
export function getStoredLeg(legId: string): RouteLeg | undefined {
  return ALL_ROAD_LEGS[legId];
}

/**
 * Returns default legs for Day 1
 */
export function getDay1Legs(): RouteLeg[] {
  return DAY1_ROAD_LEGS;
}

/**
 * Returns default legs for Day 2
 */
export function getDay2Legs(): RouteLeg[] {
  return DAY2_ROAD_LEGS;
}

/**
 * Calculates road route between two points, prioritizing:
 * 1. Verified pre-computed high-accuracy road polylines for predefined stops
 * 2. OSRM road network query if custom or alternate mode requested
 */
export async function getRouteBetweenStops(
  origin: Coordinates,
  destination: Coordinates,
  mode: TravelMode,
  fromName: string,
  toName: string,
  knownLegId?: string
): Promise<RouteLeg> {
  // If known leg exists and matches mode, return high accuracy verified road route
  if (knownLegId && ALL_ROAD_LEGS[knownLegId] && ALL_ROAD_LEGS[knownLegId].travelMode === mode) {
    return ALL_ROAD_LEGS[knownLegId];
  }

  // Attempt real road network route via OSRM
  const dynamicRoute = await fetchOsrmRoute(origin, destination, mode, fromName, toName, knownLegId || 'dynamic-leg');
  if (dynamicRoute) {
    return dynamicRoute;
  }

  // If verified leg exists under that ID even if default mode differed, use its road coordinates
  if (knownLegId && ALL_ROAD_LEGS[knownLegId]) {
    const base = ALL_ROAD_LEGS[knownLegId];
    return {
      ...base,
      travelMode: mode,
      googleMapsNavUrl: `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&travelmode=${mode === 'walking' ? 'walking' : 'driving'}`
    };
  }

  // Fallback with direct external navigation link and straight connecting waypoint
  return {
    id: knownLegId || 'fallback-leg',
    fromStopId: '',
    toStopId: '',
    fromName,
    toName,
    travelMode: mode,
    distanceKm: calculateHaversineDistanceKm(origin, destination),
    durationMinutes: Math.round(calculateHaversineDistanceKm(origin, destination) * (mode === 'walking' ? 12 : 3)),
    roadCoordinates: [
      [origin.lat, origin.lng],
      [destination.lat, destination.lng]
    ],
    maneuvers: [
      {
        instruction: `Follow road navigation to ${toName}`,
        distanceKm: calculateHaversineDistanceKm(origin, destination),
        durationMin: Math.round(calculateHaversineDistanceKm(origin, destination) * 5)
      }
    ],
    googleMapsNavUrl: `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&travelmode=${mode === 'walking' ? 'walking' : 'driving'}`
  };
}

/**
 * Standard Haversine distance in km
 */
export function calculateHaversineDistanceKm(c1: Coordinates, c2: Coordinates): number {
  const R = 6371; // Earth radius in km
  const dLat = ((c2.lat - c1.lat) * Math.PI) / 180;
  const dLon = ((c2.lng - c1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((c1.lat * Math.PI) / 180) *
      Math.cos((c2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}
