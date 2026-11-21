import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ItineraryStop, RouteLeg, UserLocation } from '../types/travel';

export type MapTileLayer = 'voyager' | 'standard' | 'satellite' | 'topo';

interface OsmRoadMapProps {
  stops: ItineraryStop[];
  legs: RouteLeg[];
  selectedStopId?: string;
  selectedLegId?: string;
  activeDay: 1 | 2 | 'both';
  tileLayerType?: MapTileLayer;
  focusedCoordinates?: [number, number] | null;
  onSelectStop: (stop: ItineraryStop) => void;
  onSelectLeg: (leg: RouteLeg) => void;
  userLocation: UserLocation | null;
}

const CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY || 'cb1_5ddb_1_4f40c7640e7b61fe89b7b13e';

const TILE_PROVIDERS: Record<MapTileLayer, { url: string; attribution: string; maxZoom: number }> = {
  voyager: {
    url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_KEY}`,
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 20
  },
  standard: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    maxZoom: 18
  },
  topo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap, SRTM | &copy; OpenTopoMap',
    maxZoom: 17
  }
};

export const OsmRoadMap: React.FC<OsmRoadMapProps> = ({
  stops,
  legs,
  selectedStopId,
  selectedLegId,
  activeDay,
  tileLayerType = 'voyager',
  focusedCoordinates,
  onSelectStop,
  onSelectLeg,
  userLocation
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);
  const polylinesLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Leaflet Map with React 18 StrictMode resilience
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const container = mapContainerRef.current;

    // Fix: Remove any stale Leaflet ID from React hot reloads or StrictMode
    if ((container as unknown as { _leaflet_id?: number })._leaflet_id) {
      delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
    }

    try {
      const map = L.map(container, {
        center: [24.5854, 73.6850], // Center of Udaipur Old City / Pichola
        zoom: 14,
        zoomControl: false
      });

      // Default Free Tile Layer with user's authenticated CARTO key
      const config = TILE_PROVIDERS[tileLayerType] || TILE_PROVIDERS.voyager;
      const tileLayer = L.tileLayer(config.url, {
        attribution: config.attribution,
        maxZoom: config.maxZoom
      }).addTo(map);

      currentTileLayerRef.current = tileLayer;

      // Add zoom control at bottom right (touch-friendly)
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      polylinesLayerRef.current = L.layerGroup().addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);
      userMarkerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;

      // Invalidate size to guarantee full container fill (prevents grey tiles)
      const timer1 = setTimeout(() => {
        map.invalidateSize();
      }, 150);

      const timer2 = setTimeout(() => {
        map.invalidateSize();
      }, 450);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        try {
          map.remove();
        } catch (e) {
          console.warn('Leaflet cleanup notice:', e);
        }
        mapInstanceRef.current = null;
        currentTileLayerRef.current = null;
        polylinesLayerRef.current = null;
        markersLayerRef.current = null;
        userMarkerRef.current = null;
      };
    } catch (err) {
      console.error('Leaflet initialization error:', err);
    }
  }, []);

  // Handle tile layer change dynamically
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      if (currentTileLayerRef.current) {
        map.removeLayer(currentTileLayerRef.current);
      }

      const config = TILE_PROVIDERS[tileLayerType] || TILE_PROVIDERS.voyager;
      const newLayer = L.tileLayer(config.url, {
        attribution: config.attribution,
        maxZoom: config.maxZoom
      }).addTo(map);

      currentTileLayerRef.current = newLayer;
      map.invalidateSize();
    } catch (e) {
      console.warn('Error changing tile layer:', e);
    }
  }, [tileLayerType]);

  // Handle smooth animated fly-to when a stop/coordinate is focused
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !focusedCoordinates) return;

    try {
      map.flyTo(focusedCoordinates, 16, {
        duration: 0.9,
        easeLinearity: 0.25
      });
    } catch (e) {
      console.warn('Fly-to error:', e);
    }
  }, [focusedCoordinates]);

  // Render road polylines & markers whenever stops, legs, or selections change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !polylinesLayerRef.current || !markersLayerRef.current) return;

    try {
      polylinesLayerRef.current.clearLayers();
      markersLayerRef.current.clearLayers();

      const bounds = L.latLngBounds([]);

      // 1. Draw Road-following Polylines
      legs.forEach(leg => {
        if (!leg.roadCoordinates || leg.roadCoordinates.length === 0) return;

        const latLngs = leg.roadCoordinates.map(c => [c[0], c[1]] as [number, number]);
        latLngs.forEach(c => bounds.extend(c));

        const isSelected = selectedLegId === leg.id;
        const isDay1 = leg.id.startsWith('d1');

        // Palette: Day 1 = Heritage Terracotta; Day 2 = Royal Deep Lake Blue
        const baseColor = isDay1 ? '#BC4749' : '#01497C';
        const strokeColor = isSelected ? '#D97706' : baseColor;
        const strokeWidth = isSelected ? 6.5 : (leg.isReturnToHotel ? 3.5 : 4.5);
        const dashArray = leg.isReturnToHotel ? '6, 8' : undefined;

        // Glowing backdrop ribbon for selected leg
        if (isSelected) {
          const glowLine = L.polyline(latLngs, {
            color: '#FEF08A',
            weight: 12,
            opacity: 0.7,
            lineCap: 'round',
            lineJoin: 'round'
          });
          glowLine.addTo(polylinesLayerRef.current!);
        }

        const polyline = L.polyline(latLngs, {
          color: strokeColor,
          weight: strokeWidth,
          opacity: isSelected ? 1.0 : (leg.isReturnToHotel ? 0.75 : 0.88),
          dashArray,
          lineCap: 'round',
          lineJoin: 'round'
        });

        polyline.on('click', () => {
          onSelectLeg(leg);
        });

        // Hover tooltip
        polyline.bindTooltip(
          `<div class="font-sans text-xs font-semibold px-1 py-0.5">${leg.fromName} → ${leg.toName}<br/><span class="text-amber-600 font-bold">${leg.distanceKm} km · ${leg.durationMinutes} min (${leg.travelMode})</span></div>`,
          { sticky: true }
        );

        polyline.addTo(polylinesLayerRef.current!);
      });

      // 2. Draw Numbered Stop Markers with Luxury Styling
      stops.forEach(stop => {
        const { lat, lng } = stop.place.coordinates;
        bounds.extend([lat, lng]);

        const isSelected = selectedStopId === stop.place.id;
        const isHotel = stop.stopNumber === 0 || stop.place.category === 'hotel';
        const isDay1 = activeDay === 1 || (stop.notes && stop.notes.includes('Day 1'));

        const markerBg = isHotel 
          ? 'bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-400 border-amber-200 text-white shadow-lg' 
          : isSelected
            ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 border-white text-charcoal-950 shadow-glow-gold scale-125 ring-4 ring-amber-400/40'
            : stop.isCompleted
              ? 'bg-gradient-to-tr from-emerald-700 to-emerald-500 border-emerald-200 text-white shadow-md'
              : isDay1
                ? 'bg-gradient-to-tr from-rose-800 to-mewar-terracotta border-white text-white shadow-md'
                : 'bg-gradient-to-tr from-blue-900 to-mewar-lake border-white text-white shadow-md';

        const labelText = isHotel ? '🏰' : stop.stopNumber.toString();
        const statusIcon = stop.isCompleted ? '✓' : '';

        const html = `
          <div class="relative group cursor-pointer transition-all duration-300 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-30'}">
            ${isSelected ? '<span class="absolute -inset-1 rounded-full bg-amber-400/50 animate-ping"></span>' : ''}
            <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs select-none ${markerBg}">
              ${statusIcon ? statusIcon : labelText}
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-charcoal-900"></div>
            <div class="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal-900/95 text-white text-[10px] font-medium px-2.5 py-1 rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 backdrop-blur-sm border border-white/20">
              ${stop.place.name} (${stop.suggestedTime})
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-road-marker',
          html,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        const marker = L.marker([lat, lng], { icon: customIcon });

        marker.on('click', () => {
          onSelectStop(stop);
        });

        marker.addTo(markersLayerRef.current!);
      });

      // If no custom focused point was clicked, fit map bounds nicely
      if (!focusedCoordinates && bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      }
    } catch (err) {
      console.warn('Error updating map markers/polylines:', err);
    }
  }, [stops, legs, selectedStopId, selectedLegId, activeDay, onSelectStop, onSelectLeg, focusedCoordinates]);

  // 3. User Location Marker with radar ping
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userMarkerRef.current) return;

    try {
      userMarkerRef.current.clearLayers();

      if (userLocation) {
        const { lat, lng } = userLocation.coordinates;

        // Radar accuracy circle
        const circle = L.circle([lat, lng], {
          radius: Math.max(25, userLocation.accuracyMeters),
          color: '#3B82F6',
          fillColor: '#60A5FA',
          fillOpacity: 0.18,
          weight: 1.5
        });
        circle.addTo(userMarkerRef.current);

        // Pulsing blue dot
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div class="relative flex items-center justify-center">
              <span class="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-lg"></span>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([lat, lng], { icon: userIcon });
        marker.bindTooltip('Your Live Position', { permanent: false, direction: 'top' });
        marker.addTo(userMarkerRef.current);
      }
    } catch (err) {
      console.warn('Error rendering user location:', err);
    }
  }, [userLocation]);

  return (
    <div className="relative w-full h-full min-h-[460px] md:min-h-[560px] rounded-2xl md:rounded-3xl overflow-hidden shadow-luxury border border-sand-200">
      <div ref={mapContainerRef} className="w-full h-full min-h-[460px] md:min-h-[560px] bg-sand-100" />
      
      {/* Floating Map Legend (Responsive) */}
      <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-2xl border border-sand-200 shadow-lg text-[11px] font-sans space-y-1.5 pointer-events-auto max-w-[200px] sm:max-w-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-600 flex items-center justify-center text-[8px] text-white font-bold">🏰</span>
          <span className="text-charcoal-900 font-bold truncate">Dreamyard (Hotel)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-mewar-terracotta rounded"></span>
          <span className="text-charcoal-700">Day 1 Road (Old City)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-mewar-lake-deep rounded"></span>
          <span className="text-charcoal-700">Day 2 Road (Lakes & Hills)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 text-[8px] text-white flex items-center justify-center font-bold">✓</span>
          <span className="text-charcoal-700">Completed Stop</span>
        </div>
      </div>
    </div>
  );
};
