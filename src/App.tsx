import { useState } from 'react';
import { 
  getInitialDay1, 
  getInitialDay2, 
  loadCompletedStops, 
  saveCompletedStop,
  saveOptimizationApplied,
  isOptimizationApplied
} from './services/itineraryService';
import { getStoredExpenses } from './services/budgetService';
import { UDAIPUR_PLACES } from './services/placesData';
import { ItineraryStop, RouteLeg, TravelMode, Place, Expense } from './types/travel';
import { Navbar } from './components/Navbar';
import { TripOverview } from './components/TripOverview';
import { InteractiveRoadMap } from './components/InteractiveRoadMap';
import { DayItineraryView } from './components/DayItineraryView';
import { PlacesDirectory } from './components/PlacesDirectory';
import { FoodAndMarkets } from './components/FoodAndMarkets';
import { BudgetTracker } from './components/BudgetTracker';
import { SmartTravelAssistant } from './components/SmartTravelAssistant';
import { WeatherAndSafety } from './components/WeatherAndSafety';
import { TravelChecklist } from './components/TravelChecklist';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { OptimizeTripModal } from './components/OptimizeTripModal';
import { Compass, Map, Calendar, IndianRupee, ShieldCheck } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  // Initialize Day 1 and Day 2 with persistent completed stops
  const [day1, setDay1] = useState(() => {
    const d1 = getInitialDay1();
    const completedMap = loadCompletedStops();
    d1.stops = d1.stops.map(s => ({
      ...s,
      isCompleted: Boolean(completedMap[`day1_stop_${s.stopNumber}`])
    }));
    return d1;
  });

  const [day2, setDay2] = useState(() => {
    const d2 = getInitialDay2();
    const completedMap = loadCompletedStops();
    d2.stops = d2.stops.map(s => ({
      ...s,
      isCompleted: Boolean(completedMap[`day2_stop_${s.stopNumber}`])
    }));
    return d2;
  });

  const [selectedStop, setSelectedStop] = useState<ItineraryStop | null>(null);
  const [selectedLeg, setSelectedLeg] = useState<RouteLeg | null>(null);
  const [activePlaceModalId, setActivePlaceModalId] = useState<string | null>(null);
  const [showOptimizeModal, setShowOptimizeModal] = useState<boolean>(false);

  // Optimization state
  const [isDay1Optimized, setIsDay1Optimized] = useState(() => isOptimizationApplied(1));
  const [isDay2Optimized, setIsDay2Optimized] = useState(() => isOptimizationApplied(2));

  // Budget Expenses
  const [expenses, setExpenses] = useState<Expense[]>(() => getStoredExpenses());

  // Toggle complete checkbox
  const handleToggleCompleteStop = (stopNumber: number, dayNumber: 1 | 2) => {
    const key = `day${dayNumber}_stop_${stopNumber}`;
    if (dayNumber === 1) {
      setDay1(prev => {
        const nextStops = prev.stops.map(s => {
          if (s.stopNumber === stopNumber) {
            const nextCompleted = !s.isCompleted;
            saveCompletedStop(key, nextCompleted);
            return { ...s, isCompleted: nextCompleted };
          }
          return s;
        });
        return { ...prev, stops: nextStops };
      });
    } else {
      setDay2(prev => {
        const nextStops = prev.stops.map(s => {
          if (s.stopNumber === stopNumber) {
            const nextCompleted = !s.isCompleted;
            saveCompletedStop(key, nextCompleted);
            return { ...s, isCompleted: nextCompleted };
          }
          return s;
        });
        return { ...prev, stops: nextStops };
      });
    }
  };

  // Change travel mode for a leg
  const handleChangeLegTravelMode = (legId: string, newMode: TravelMode) => {
    const updateLeg = (leg: RouteLeg): RouteLeg => {
      if (leg.id !== legId) return leg;
      const durationMinutes = Math.max(2, Math.round(leg.distanceKm * (newMode === 'walking' ? 14 : 3)));
      const travelParam = newMode === 'walking' ? 'walking' : 'driving';
      const coords = leg.roadCoordinates[0];
      const endCoords = leg.roadCoordinates[leg.roadCoordinates.length - 1];
      const googleMapsNavUrl = `https://www.google.com/maps/dir/?api=1&origin=${coords[0]},${coords[1]}&destination=${endCoords[0]},${endCoords[1]}&travelmode=${travelParam}`;

      return {
        ...leg,
        travelMode: newMode,
        durationMinutes,
        googleMapsNavUrl
      };
    };

    setDay1(prev => ({
      ...prev,
      legs: prev.legs.map(updateLeg)
    }));

    setDay2(prev => ({
      ...prev,
      legs: prev.legs.map(updateLeg)
    }));
  };

  // Optimization handlers
  const handleApplyOptimization = (dayNumber: 1 | 2) => {
    if (dayNumber === 1) {
      setIsDay1Optimized(true);
      saveOptimizationApplied(1, true);
    } else {
      setIsDay2Optimized(true);
      saveOptimizationApplied(2, true);
    }
  };

  const handleRestoreOriginal = (dayNumber: 1 | 2) => {
    if (dayNumber === 1) {
      setIsDay1Optimized(false);
      saveOptimizationApplied(1, false);
      setDay1(getInitialDay1());
    } else {
      setIsDay2Optimized(false);
      saveOptimizationApplied(2, false);
      setDay2(getInitialDay2());
    }
  };

  // Navigation helpers
  const handleSelectStopOnMap = (stop: ItineraryStop) => {
    setSelectedStop(stop);
    setActiveTab('map');
  };

  const handleSelectPlaceOnMap = (place: Place) => {
    const d1Stop = day1.stops.find(s => s.place.id === place.id);
    const d2Stop = day2.stops.find(s => s.place.id === place.id);
    if (d1Stop) {
      setActiveDay(1);
      setSelectedStop(d1Stop);
    } else if (d2Stop) {
      setActiveDay(2);
      setSelectedStop(d2Stop);
    }
    setActiveTab('map');
  };

  const activePlaceModal = activePlaceModalId ? UDAIPUR_PLACES[activePlaceModalId] : null;

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col font-sans selection:bg-mewar-gold selection:text-charcoal-950">
      {/* Top Main Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        expenses={expenses}
      />

      {/* Main Container with Safe Padding for Phones / Tablets */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 pb-safe md:pb-12">
        {activeTab === 'overview' && (
          <TripOverview
            day1={day1}
            day2={day2}
            expenses={expenses}
            onSelectTab={setActiveTab}
            onOpenPlaceDetail={setActivePlaceModalId}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveRoadMap
            day1Stops={day1.stops}
            day1Legs={day1.legs}
            day2Stops={day2.stops}
            day2Legs={day2.legs}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            selectedStop={selectedStop}
            setSelectedStop={setSelectedStop}
            selectedLeg={selectedLeg}
            setSelectedLeg={setSelectedLeg}
            onOpenPlaceDetail={setActivePlaceModalId}
          />
        )}

        {activeTab === 'day1' && (
          <DayItineraryView
            day={day1}
            onSelectStop={stop => {
              setSelectedStop(stop);
            }}
            onSelectLeg={leg => {
              setSelectedLeg(leg);
            }}
            onOpenPlaceDetail={setActivePlaceModalId}
            onToggleComplete={handleToggleCompleteStop}
            onChangeLegTravelMode={handleChangeLegTravelMode}
            onOpenOptimizeModal={() => {
              setActiveDay(1);
              setShowOptimizeModal(true);
            }}
            onSwitchToMap={() => {
              setActiveDay(1);
              setActiveTab('map');
            }}
            selectedStopId={selectedStop?.place.id}
            selectedLegId={selectedLeg?.id}
            isOptimized={isDay1Optimized}
            onRestoreOriginal={() => handleRestoreOriginal(1)}
          />
        )}

        {activeTab === 'day2' && (
          <DayItineraryView
            day={day2}
            onSelectStop={stop => {
              setSelectedStop(stop);
            }}
            onSelectLeg={leg => {
              setSelectedLeg(leg);
            }}
            onOpenPlaceDetail={setActivePlaceModalId}
            onToggleComplete={handleToggleCompleteStop}
            onChangeLegTravelMode={handleChangeLegTravelMode}
            onOpenOptimizeModal={() => {
              setActiveDay(2);
              setShowOptimizeModal(true);
            }}
            onSwitchToMap={() => {
              setActiveDay(2);
              setActiveTab('map');
            }}
            selectedStopId={selectedStop?.place.id}
            selectedLegId={selectedLeg?.id}
            isOptimized={isDay2Optimized}
            onRestoreOriginal={() => handleRestoreOriginal(2)}
          />
        )}

        {activeTab === 'places' && (
          <PlacesDirectory
            onOpenPlaceDetail={setActivePlaceModalId}
            onSelectOnMap={handleSelectPlaceOnMap}
          />
        )}

        {activeTab === 'food' && (
          <FoodAndMarkets
            onNavigateToCoords={(lat, lng) => {
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
            }}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetTracker
            expenses={expenses}
            onExpensesChange={setExpenses}
          />
        )}

        {activeTab === 'assistant' && (
          <SmartTravelAssistant
            day1={day1}
            day2={day2}
            expenses={expenses}
            activeDay={activeDay}
            onSelectStopOnMap={handleSelectStopOnMap}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherAndSafety />
        )}

        {activeTab === 'checklist' && (
          <TravelChecklist />
        )}
      </main>

      {/* Floating Mobile Bottom Navigation Bar (iPhone & Android Safe-Area Responsive) */}
      <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-sand-200 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-luxury-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 rounded-xl transition-all ${
            activeTab === 'overview' ? 'text-charcoal-900 scale-105' : 'text-sand-400 hover:text-charcoal-700'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>My Trip</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 rounded-xl transition-all ${
            activeTab === 'map' ? 'text-charcoal-900 scale-105' : 'text-sand-400 hover:text-charcoal-700'
          }`}
        >
          <Map className="w-5 h-5" />
          <span>Road Map</span>
        </button>

        <button
          onClick={() => { setActiveDay(1); setActiveTab('day1'); }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 rounded-xl transition-all ${
            activeTab === 'day1' ? 'text-mewar-terracotta scale-105' : 'text-sand-400 hover:text-charcoal-700'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Day 1</span>
        </button>

        <button
          onClick={() => { setActiveDay(2); setActiveTab('day2'); }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 rounded-xl transition-all ${
            activeTab === 'day2' ? 'text-mewar-lake-deep scale-105' : 'text-sand-400 hover:text-charcoal-700'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Day 2</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 rounded-xl transition-all ${
            activeTab === 'budget' ? 'text-charcoal-900 scale-105' : 'text-sand-400 hover:text-charcoal-700'
          }`}
        >
          <IndianRupee className="w-5 h-5" />
          <span>Budget</span>
        </button>
      </nav>

      {/* Place Detail Modal */}
      <PlaceDetailModal
        place={activePlaceModal}
        onClose={() => setActivePlaceModalId(null)}
        onOpenMapToPlace={handleSelectPlaceOnMap}
      />

      {/* Optimize Trip Modal */}
      {showOptimizeModal && (
        <OptimizeTripModal
          day1={day1}
          day2={day2}
          activeDay={activeDay}
          onClose={() => setShowOptimizeModal(false)}
          onApplyOptimization={handleApplyOptimization}
          onRestoreOriginal={handleRestoreOriginal}
          isDay1Optimized={isDay1Optimized}
          isDay2Optimized={isDay2Optimized}
        />
      )}

      {/* Footer */}
      <footer className="bg-charcoal-950 text-sand-300 border-t border-charcoal-900 py-8 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-serif font-bold text-white text-sm">
              Udaipur Smart Route Planner · Chalo Chalte Hain
            </p>
            <p className="text-sand-400">
              Solo Heritage & Lakes Tour · 24 & 25 November 2026 · Starting & Ending at Dreamyard Udaipur
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sand-400 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CARTO Basemaps + OpenStreetMap</span>
            </span>
            <span>•</span>
            <span>₹5,000 Budget Tracking</span>
            <span>•</span>
            <span>OSRM Real Road Following</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
