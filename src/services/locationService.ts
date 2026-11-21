import { Coordinates, ItineraryStop, UserLocation } from '../types/travel';
import { calculateHaversineDistanceKm } from './routeService';

export function requestUserPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  });
}

export function findNearestStop(
  currentCoords: Coordinates,
  stops: ItineraryStop[]
): { nearestStop: ItineraryStop; distanceKm: number } | null {
  if (!stops || stops.length === 0) return null;

  let nearest = stops[0];
  let minDistance = calculateHaversineDistanceKm(currentCoords, nearest.place.coordinates);

  for (let i = 1; i < stops.length; i++) {
    const dist = calculateHaversineDistanceKm(currentCoords, stops[i].place.coordinates);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = stops[i];
    }
  }

  return { nearestStop: nearest, distanceKm: minDistance };
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export function buildUserLocationState(
  pos: GeolocationPosition,
  stops: ItineraryStop[]
): UserLocation {
  const coords: Coordinates = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  };

  const nearest = findNearestStop(coords, stops);

  return {
    coordinates: coords,
    accuracyMeters: Math.round(pos.coords.accuracy),
    timestamp: pos.timestamp,
    nearestStop: nearest?.nearestStop,
    distanceToNearestKm: nearest?.distanceKm
  };
}
