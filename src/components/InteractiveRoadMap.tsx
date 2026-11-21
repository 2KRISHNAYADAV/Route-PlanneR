import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Compass, 
  ExternalLink, 
  Crosshair, 
  ChevronRight, 
  ChevronLeft,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Footprints,
  Car,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ItineraryStop, RouteLeg, UserLocation } from '../types/travel';
import { OsmRoadMap, MapTileLayer } from './OsmRoadMap';
import { requestUserPosition, buildUserLocationState, formatDistance } from '../services/locationService';

interface InteractiveRoadMapProps {
  day1Stops: ItineraryStop[];
  day1Legs: RouteLeg[];
  day2Stops: ItineraryStop[];
  day2Legs: RouteLeg[];
  activeDay: 1 | 2;
  setActiveDay: (day: 1 | 2) => void;
  selectedStop: ItineraryStop | null;
  setSelectedStop: (stop: ItineraryStop | null) => void;
  selectedLeg: RouteLeg | null;
  setSelectedLeg: (leg: RouteLeg | null) => void;
  onOpenPlaceDetail: (placeId: string) => void;
}

export const InteractiveRoadMap: React.FC<InteractiveRoadMapProps> = ({
  day1Stops,
  day1Legs,
  day2Stops,
  day2Legs,
  activeDay,
  setActiveDay,
  selectedStop,
  setSelectedStop,
  selectedLeg,
  setSelectedLeg,
  onOpenPlaceDetail
}) => {
  const [tileLayer, setTileLayer] = useState<MapTileLayer>('voyager');
  const [showBothDays, setShowBothDays] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [focusedCoords, setFocusedCoords] = useState<[number, number] | null>(null);
  const [mobileDrawerExpanded, setMobileDrawerExpanded] = useState(true);
  const [routePreference, setRoutePreference] = useState<'shortest' | 'quickest'>('shortest');

  // Determine current stops and legs to display
  const currentStops = showBothDays 
    ? [...day1Stops, ...day2Stops] 
    : (activeDay === 1 ? day1Stops : day2Stops);

  const currentLegs = showBothDays
    ? [...day1Legs, ...day2Legs]
    : (activeDay === 1 ? day1Legs : day2Legs);

  // Active leg or fallback
  const activeLegDisplay = selectedLeg || (currentLegs.length > 0 ? currentLegs[0] : null);
  const activeLegIndex = currentLegs.findIndex(l => l.id === activeLegDisplay?.id);

  // Step-by-Step Navigation Controls
  const handleNextStep = () => {
    if (activeLegIndex < currentLegs.length - 1) {
      const nextLeg = currentLegs[activeLegIndex + 1];
      setSelectedLeg(nextLeg);
      const matchingStop = currentStops.find(s => s.place.id === nextLeg.toStopId);
      if (matchingStop) {
        setSelectedStop(matchingStop);
        setFocusedCoords([matchingStop.place.coordinates.lat, matchingStop.place.coordinates.lng]);
      } else if (nextLeg.roadCoordinates && nextLeg.roadCoordinates.length > 0) {
        setFocusedCoords(nextLeg.roadCoordinates[0]);
      }
    }
  };

  const handlePrevStep = () => {
    if (activeLegIndex > 0) {
      const prevLeg = currentLegs[activeLegIndex - 1];
      setSelectedLeg(prevLeg);
      const matchingStop = currentStops.find(s => s.place.id === prevLeg.toStopId);
      if (matchingStop) {
        setSelectedStop(matchingStop);
        setFocusedCoords([matchingStop.place.coordinates.lat, matchingStop.place.coordinates.lng]);
      } else if (prevLeg.roadCoordinates && prevLeg.roadCoordinates.length > 0) {
        setFocusedCoords(prevLeg.roadCoordinates[0]);
      }
    }
  };

  const handleLocateMe = async () => {
    setIsLocating(true);
    setLocationError(null);
    try {
      const pos = await requestUserPosition();
      const locState = buildUserLocationState(pos, currentStops);
      setUserLocation(locState);
      setFocusedCoords([pos.coords.latitude, pos.coords.longitude]);
    } catch (err: unknown) {
      const error = err as Error;
      setLocationError(error.message || 'Unable to retrieve your current GPS position.');
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-3.5 sm:p-4 shadow-luxury border border-sand-200 flex flex-wrap items-center justify-between gap-3">
        {/* Day Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-sand-100 p-1 rounded-2xl">
          <button
            onClick={() => { setActiveDay(1); setShowBothDays(false); setFocusedCoords(null); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              !showBothDays && activeDay === 1 
                ? 'bg-mewar-terracotta text-white shadow-md' 
                : 'text-charcoal-800 hover:text-black'
            }`}
          >
            Day 1: Old City
          </button>
          <button
            onClick={() => { setActiveDay(2); setShowBothDays(false); setFocusedCoords(null); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              !showBothDays && activeDay === 2 
                ? 'bg-mewar-lake-deep text-white shadow-md' 
                : 'text-charcoal-800 hover:text-black'
            }`}
          >
            Day 2: Lakes & Hills
          </button>
          <button
            onClick={() => { setShowBothDays(!showBothDays); setFocusedCoords(null); }}
            className={`hidden sm:inline px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              showBothDays 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-sand-500 hover:text-charcoal-900'
            }`}
          >
            {showBothDays ? 'Showing Both Days' : 'Compare Both'}
          </button>
        </div>

        {/* Free Map Layer Switcher & Routing Preference */}
        <div className="flex items-center gap-2">
          {/* Shortest vs Quickest Route Toggle */}
          <button
            onClick={() => setRoutePreference(routePreference === 'shortest' ? 'quickest' : 'shortest')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              routePreference === 'shortest'
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                : 'bg-blue-50 border-blue-300 text-blue-900 shadow-sm'
            }`}
            title="Toggle between Shortest walking footpaths/alleyways and Quickest road vehicle routes"
          >
            <Zap className="w-3.5 h-3.5 text-mewar-gold" />
            <span className="hidden sm:inline">Path:</span>
            <span>{routePreference === 'shortest' ? 'Shortest Walk' : 'Quickest Road'}</span>
          </button>

          {/* Map Layer Selector */}
          <div className="flex items-center bg-sand-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setTileLayer('voyager')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                tileLayer === 'voyager' ? 'bg-white shadow-sm text-charcoal-900 font-bold' : 'text-sand-500'
              }`}
              title="CartoDB Voyager - Heritage luxury style"
            >
              Voyager
            </button>
            <button
              onClick={() => setTileLayer('satellite')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                tileLayer === 'satellite' ? 'bg-white shadow-sm text-charcoal-900 font-bold' : 'text-sand-500'
              }`}
              title="ESRI World Imagery - Free Satellite View"
            >
              Satellite
            </button>
            <button
              onClick={() => setTileLayer('topo')}
              className={`hidden sm:inline px-2.5 py-1.5 rounded-lg transition-colors ${
                tileLayer === 'topo' ? 'bg-white shadow-sm text-charcoal-900 font-bold' : 'text-sand-500'
              }`}
              title="OpenTopoMap - Mountain contours & elevations"
            >
              Topo
            </button>
          </div>

          {/* Locate Me Button */}
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
              userLocation 
                ? 'bg-blue-50 border-blue-300 text-blue-800' 
                : 'bg-white border-sand-200 text-charcoal-700 hover:border-sand-400'
            }`}
            title="Detect GPS location and show distance to nearest stop"
          >
            <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-blue-600' : ''}`} />
            <span className="hidden sm:inline">{isLocating ? 'Locating...' : userLocation ? 'GPS Live' : 'Locate Me'}</span>
          </button>
        </div>
      </div>

      {locationError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl px-3.5 py-2 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{locationError}</span>
        </div>
      )}

      {/* Step-by-Step Guided Navigation Control Bar */}
      {currentLegs.length > 0 && activeLegDisplay && (
        <div className="bg-gradient-to-r from-cream-50 via-white to-amber-50/50 rounded-2xl p-3 border border-sand-200 shadow-sm flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              disabled={activeLegIndex <= 0}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 font-bold ${
                activeLegIndex <= 0
                  ? 'bg-sand-100 text-sand-400 border-sand-200 cursor-not-allowed'
                  : 'bg-white text-charcoal-900 border-sand-300 hover:bg-sand-100 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Leg</span>
            </button>

            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-[11px] whitespace-nowrap">
              Step {activeLegIndex + 1} of {currentLegs.length}
            </span>

            <button
              onClick={handleNextStep}
              disabled={activeLegIndex >= currentLegs.length - 1}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 font-bold ${
                activeLegIndex >= currentLegs.length - 1
                  ? 'bg-sand-100 text-sand-400 border-sand-200 cursor-not-allowed'
                  : 'bg-white text-charcoal-900 border-sand-300 hover:bg-sand-100 active:scale-95'
              }`}
            >
              <span className="hidden sm:inline">Next Leg</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="truncate flex-1 text-center hidden md:block">
            <span className="font-bold text-charcoal-900">{activeLegDisplay.fromName}</span>
            <span className="text-sand-400 mx-1.5">→</span>
            <span className="font-bold text-mewar-terracotta">{activeLegDisplay.toName}</span>
            <span className="text-sand-500 ml-2">({activeLegDisplay.distanceKm} km · {activeLegDisplay.durationMinutes} min)</span>
          </div>

          <a
            href={activeLegDisplay.googleMapsNavUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95 transition-transform"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Turn-by-Turn Nav</span>
          </a>
        </div>
      )}

      {/* Main Map + Side Detail Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map View Area */}
        <div className="lg:col-span-8 flex flex-col space-y-2">
          <OsmRoadMap
            stops={currentStops}
            legs={currentLegs}
            selectedStopId={selectedStop?.place.id}
            selectedLegId={selectedLeg?.id}
            activeDay={showBothDays ? 'both' : activeDay}
            tileLayerType={tileLayer}
            focusedCoordinates={focusedCoords}
            onSelectStop={stop => {
              setSelectedStop(stop);
              setFocusedCoords([stop.place.coordinates.lat, stop.place.coordinates.lng]);
              const matchingLeg = currentLegs.find(l => l.toStopId === stop.place.id);
              if (matchingLeg) setSelectedLeg(matchingLeg);
            }}
            onSelectLeg={leg => {
              setSelectedLeg(leg);
              const matchingStop = currentStops.find(s => s.place.id === leg.toStopId);
              if (matchingStop) {
                setSelectedStop(matchingStop);
                setFocusedCoords([matchingStop.place.coordinates.lat, matchingStop.place.coordinates.lng]);
              } else if (leg.roadCoordinates && leg.roadCoordinates.length > 0) {
                setFocusedCoords(leg.roadCoordinates[0]);
              }
            }}
            userLocation={userLocation}
          />

          {/* Quick Route Summary Bar Under Map */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-charcoal-700 font-sans">
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-charcoal-900">
                {showBothDays ? '2-Day Itinerary' : `Day ${activeDay}`}
              </span>
              <span>•</span>
              <span>{currentStops.length} Waypoints</span>
              <span>•</span>
              <span className="text-mewar-ruby font-bold">
                {currentLegs.reduce((a, b) => a + b.distanceKm, 0).toFixed(1)} km Total Road Route
              </span>
            </div>
            {userLocation?.nearestStop && (
              <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-medium">
                <MapPin className="w-3 h-3 text-blue-600" />
                <span>Nearest: {userLocation.nearestStop.place.name} ({formatDistance(userLocation.distanceToNearestKm || 0)})</span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Leg / Stop Navigation Panel (Responsive Drawer) */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          {activeLegDisplay ? (
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-luxury border border-sand-200 flex flex-col justify-between">
              <div>
                {/* Header with from -> to */}
                <div className="flex items-center justify-between pb-3 border-b border-sand-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                      <Navigation className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-sand-500">
                      Step {activeLegIndex + 1} Navigation
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    activeLegDisplay.travelMode === 'walking' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activeLegDisplay.travelMode.replace('_', ' ')}
                  </span>
                </div>

                {/* Locations Flow */}
                <div className="my-3 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-sand-400 mt-1 shrink-0 flex items-center justify-center text-[8px] text-white font-bold">A</div>
                    <div>
                      <p className="text-[10px] text-sand-500 font-bold uppercase">Starting From</p>
                      <p className="text-xs font-bold text-charcoal-900">{activeLegDisplay.fromName}</p>
                    </div>
                  </div>
                  <div className="ml-1.5 h-3.5 border-l-2 border-dashed border-sand-300" />
                  <div className="flex items-start gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-mewar-terracotta mt-1 shrink-0 flex items-center justify-center text-[8px] text-white font-bold">B</div>
                    <div>
                      <p className="text-[10px] text-sand-500 font-bold uppercase">Destination</p>
                      <p className="text-xs font-bold text-charcoal-900">{activeLegDisplay.toName}</p>
                    </div>
                  </div>
                </div>

                {/* Distance & Duration Pills */}
                <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-cream-50 rounded-2xl border border-sand-200">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-mewar-amber shrink-0" />
                    <div>
                      <span className="text-[10px] text-sand-500 font-bold block uppercase">Actual Distance</span>
                      <span className="text-sm font-extrabold text-charcoal-900">{activeLegDisplay.distanceKm} km</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-mewar-amber shrink-0" />
                    <div>
                      <span className="text-[10px] text-sand-500 font-bold block uppercase">Est. Travel Time</span>
                      <span className="text-sm font-extrabold text-charcoal-900">{activeLegDisplay.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Turn-by-Turn Maneuvers Collapsible */}
                <div className="mt-2">
                  <button
                    onClick={() => setMobileDrawerExpanded(!mobileDrawerExpanded)}
                    className="w-full flex items-center justify-between text-xs font-bold text-charcoal-800 py-1.5 hover:text-black"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>Turn-by-Turn Road Guide</span>
                      <span className="text-[10px] text-sand-500 font-normal">
                        ({activeLegDisplay.maneuvers.length} steps)
                      </span>
                    </span>
                    {mobileDrawerExpanded ? <ChevronUp className="w-4 h-4 text-sand-500" /> : <ChevronDown className="w-4 h-4 text-sand-500" />}
                  </button>

                  {mobileDrawerExpanded && (
                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs mt-2 animate-fadeIn">
                      {activeLegDisplay.maneuvers.map((m, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-sand-50 border border-sand-200 flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-sand-200 text-charcoal-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-charcoal-900 leading-tight">{m.instruction}</p>
                            {m.streetName && (
                              <p className="text-[10px] text-sand-500 mt-0.5">{m.streetName} · {m.distanceKm} km</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-sand-100 flex flex-col gap-2 mt-3">
                <a
                  href={activeLegDisplay.googleMapsNavUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Start Turn-by-Turn Navigation</span>
                </a>

                {selectedStop && (
                  <button
                    onClick={() => onOpenPlaceDetail(selectedStop.place.id)}
                    className="w-full py-2 px-3 bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Sightseeing & Ticket Info</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 shadow-luxury border border-sand-200 text-center flex flex-col items-center justify-center h-full min-h-[220px]">
              <MapPin className="w-8 h-8 text-sand-400 mb-2 animate-floatBob" />
              <p className="text-sm font-bold text-charcoal-800">Select any stop or road leg</p>
              <p className="text-xs text-sand-500 mt-1 max-w-xs">
                Tap any numbered pin on the map or use the guided Next Leg buttons above to inspect road maneuvers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
