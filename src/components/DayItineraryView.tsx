import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Footprints, 
  Car, 
  Bike, 
  ChevronRight, 
  Sparkles, 
  RotateCcw, 
  AlertCircle,
  Utensils,
  Eye,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Navigation
} from 'lucide-react';
import { ItineraryDay, ItineraryStop, RouteLeg, TravelMode } from '../types/travel';
import confetti from 'canvas-confetti';

interface DayItineraryViewProps {
  day: ItineraryDay;
  onSelectStop: (stop: ItineraryStop) => void;
  onSelectLeg: (leg: RouteLeg) => void;
  onOpenPlaceDetail: (placeId: string) => void;
  onToggleComplete: (stopNumber: number, dayNumber: 1 | 2) => void;
  onChangeLegTravelMode: (legId: string, newMode: TravelMode) => void;
  onOpenOptimizeModal: () => void;
  onSwitchToMap: () => void;
  selectedStopId?: string;
  selectedLegId?: string;
  isOptimized: boolean;
  onRestoreOriginal: () => void;
}

export const DayItineraryView: React.FC<DayItineraryViewProps> = ({
  day,
  onSelectStop,
  onSelectLeg,
  onOpenPlaceDetail,
  onToggleComplete,
  onChangeLegTravelMode,
  onOpenOptimizeModal,
  onSwitchToMap,
  selectedStopId,
  selectedLegId,
  isOptimized,
  onRestoreOriginal
}) => {
  const completedCount = day.stops.filter(s => s.stopNumber > 0 && s.isCompleted).length;
  const totalSightseeing = day.stops.filter(s => s.stopNumber > 0).length;
  const progressPercent = Math.round((completedCount / (totalSightseeing || 1)) * 100);

  const handleCheckboxClick = (e: React.MouseEvent, stopNumber: number) => {
    e.stopPropagation();
    onToggleComplete(stopNumber, day.dayNumber);
    const stop = day.stops.find(s => s.stopNumber === stopNumber);
    if (stop && !stop.isCompleted) {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.7 }
      });
    }
  };

  const getTravelModeIcon = (mode: TravelMode) => {
    switch (mode) {
      case 'walking': return <Footprints className="w-4 h-4" />;
      case 'driving': return <Car className="w-4 h-4" />;
      case 'two_wheeler': return <Bike className="w-4 h-4" />;
      case 'auto_taxi': return <Car className="w-4 h-4" />;
      default: return <Footprints className="w-4 h-4" />;
    }
  };

  const getTimeOfDayIcon = (time: string) => {
    if (time.includes('06:') || time.includes('07:') || time.includes('08:') || time.includes('09:')) {
      return <Sunrise className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (time.includes('10:') || time.includes('11:') || time.includes('12:') || time.includes('01:') || time.includes('02:')) {
      return <Sun className="w-3.5 h-3.5 text-orange-500" />;
    }
    if (time.includes('03:') || time.includes('04:') || time.includes('05:') || time.includes('06:')) {
      return <Sunset className="w-3.5 h-3.5 text-rose-500" />;
    }
    return <Moon className="w-3.5 h-3.5 text-indigo-500" />;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Day Header Banner */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 shadow-luxury border border-sand-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-sm ${
              day.dayNumber === 1 ? 'bg-mewar-terracotta' : 'bg-mewar-lake-deep'
            }`}>
              Day {day.dayNumber} · {day.date}
            </span>
            {isOptimized && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Optimized Road Order
              </span>
            )}
          </div>
          <h2 className="text-xl md:text-3xl font-serif font-bold text-charcoal-900">
            {day.title}
          </h2>
          <p className="text-xs text-sand-500 font-sans mt-0.5">
            {day.theme} · Total Road Route: <span className="font-bold text-charcoal-800">{day.totalDistanceKm} km</span> ({day.totalTravelMinutes} min)
          </p>
        </div>

        {/* Progress & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Progress Pill */}
          <div className="px-3.5 py-2 rounded-2xl bg-cream-50 border border-sand-200 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
              {progressPercent}%
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-sand-500 block">Progress</span>
              <span className="text-xs font-bold text-charcoal-800">{completedCount} of {totalSightseeing} visited</span>
            </div>
          </div>

          {/* Optimize Trip Button */}
          <button
            onClick={onOpenOptimizeModal}
            className="px-4 py-2.5 rounded-2xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-charcoal-900" />
            <span>OPTIMIZE TRIP</span>
          </button>

          {isOptimized && (
            <button
              onClick={onRestoreOriginal}
              className="p-2.5 rounded-2xl bg-sand-100 hover:bg-sand-200 text-charcoal-700 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Restore original itinerary sequence"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restore</span>
            </button>
          )}
        </div>
      </div>

      {/* Sequential Journey Timeline */}
      <div className="relative pl-3 sm:pl-6 space-y-4">
        {/* Continuous timeline vertical line */}
        <div className="absolute left-6 sm:left-9 top-4 bottom-8 w-0.5 bg-gradient-to-b from-amber-500 via-sand-300 to-amber-700" />

        {day.stops.map((stop, idx) => {
          const isHotel = stop.stopNumber === 0;
          const isSelected = selectedStopId === stop.place.id;
          const correspondingLeg = day.legs[idx]; // leg leading to NEXT stop

          return (
            <React.Fragment key={stop.place.id + idx}>
              {/* STOP CARD */}
              <div
                onClick={() => {
                  onSelectStop(stop);
                  if (correspondingLeg) onSelectLeg(correspondingLeg);
                }}
                className={`relative z-10 bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-luxury border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-mewar-gold ring-2 ring-mewar-gold/30 shadow-luxury-lg scale-[1.01]' 
                    : 'border-sand-200 hover:border-sand-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Number Badge / Completed Checkbox */}
                    <button
                      onClick={(e) => handleCheckboxClick(e, stop.stopNumber)}
                      className="mt-0.5 shrink-0 group focus:outline-none min-w-[36px] min-h-[36px] flex items-center justify-center"
                      title={stop.isCompleted ? 'Mark as incomplete' : 'Mark as visited'}
                    >
                      {isHotel ? (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                          🏰
                        </div>
                      ) : stop.isCompleted ? (
                        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:bg-emerald-700">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-sm transition-colors ${
                          day.dayNumber === 1 
                            ? 'border-mewar-terracotta text-mewar-terracotta group-hover:bg-mewar-terracotta group-hover:text-white' 
                            : 'border-mewar-lake-deep text-mewar-lake-deep group-hover:bg-mewar-lake-deep group-hover:text-white'
                        }`}>
                          {stop.stopNumber}
                        </div>
                      )}
                    </button>

                    {/* Place Info */}
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 border border-amber-200">
                          {getTimeOfDayIcon(stop.suggestedTime)}
                          <span>{stop.suggestedTime}</span>
                          {stop.departureTime && <span>– {stop.departureTime}</span>}
                        </span>
                        <span className="text-[11px] font-medium text-sand-500 uppercase tracking-wide">
                          {stop.place.category}
                        </span>
                        {stop.place.entryFee.amount === 0 ? (
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            FREE ENTRY
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-charcoal-700 bg-sand-100 px-2 py-0.5 rounded">
                            ₹{stop.place.entryFee.amount}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-xl font-serif font-bold text-charcoal-900 mt-1">
                        {isHotel ? 'START: ' : `STOP ${stop.stopNumber}: `}
                        {stop.place.name}
                      </h3>

                      {stop.place.hindiName && (
                        <p className="text-xs text-sand-500 font-sans">{stop.place.hindiName}</p>
                      )}

                      <p className="text-xs sm:text-sm text-charcoal-700 mt-1.5 leading-relaxed font-sans">
                        {stop.place.description}
                      </p>

                      {stop.notes && (
                        <div className="mt-2.5 text-xs bg-amber-50/80 text-amber-950 border border-amber-200/90 rounded-2xl p-2.5 font-medium flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{stop.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                    {stop.place.images && stop.place.images[0] && (
                      <img
                        src={stop.place.images[0]}
                        alt={stop.place.name}
                        className="w-24 h-20 object-cover rounded-2xl border border-sand-200 shadow-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Footer Buttons for Stop */}
                <div className="mt-4 pt-3 border-t border-sand-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPlaceDetail(stop.place.id);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-800 text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Sightseeing Details & Tips</span>
                    </button>
                    {stop.place.category === 'food' && (
                      <span className="text-xs text-mewar-amber font-semibold flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Food Stop</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStop(stop);
                      onSwitchToMap();
                    }}
                    className="text-xs text-mewar-ruby hover:underline font-bold flex items-center gap-1"
                  >
                    <span>View on Map</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ROAD NAVIGATION CONNECTOR LEG (between this stop and next stop) */}
              {correspondingLeg && idx < day.stops.length - 1 && (
                <div className="my-2.5 pl-5 sm:pl-8 relative z-20">
                  <div
                    onClick={() => onSelectLeg(correspondingLeg)}
                    className={`bg-cream-50 hover:bg-white rounded-2xl p-3 sm:p-4 border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-3 ${
                      selectedLegId === correspondingLeg.id 
                        ? 'border-mewar-gold ring-2 ring-mewar-gold/25 shadow-sm' 
                        : 'border-sand-200 hover:border-sand-300'
                    }`}
                  >
                    {/* Left: Travel Mode Badge & Distance */}
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-sand-200 text-charcoal-900 shadow-sm shrink-0">
                        {getTravelModeIcon(correspondingLeg.travelMode)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-charcoal-900">
                            ↓ {correspondingLeg.travelMode === 'walking' ? 'WALKING PATH' : 'ROAD ROUTE'} TO {day.stops[idx + 1]?.place.name}
                          </span>
                        </div>
                        <p className="text-xs text-sand-500 font-sans mt-0.5">
                          Real road distance: <strong className="text-charcoal-800 font-bold">{correspondingLeg.distanceKm} km</strong> · Approx <strong className="text-charcoal-800 font-bold">{correspondingLeg.durationMinutes} min</strong>
                        </p>
                      </div>
                    </div>

                    {/* Right: Mode Selector & External Navigation Link */}
                    <div className="flex items-center gap-2">
                      {/* Mode Switcher */}
                      <select
                        value={correspondingLeg.travelMode}
                        onChange={(e) => {
                          e.stopPropagation();
                          onChangeLegTravelMode(correspondingLeg.id, e.target.value as TravelMode);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white border border-sand-300 rounded-xl px-2.5 py-1.5 text-xs font-medium text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-mewar-gold"
                      >
                        <option value="walking">Walking</option>
                        <option value="auto_taxi">Auto / Taxi</option>
                        <option value="two_wheeler">Two-Wheeler</option>
                        <option value="driving">Driving</option>
                      </select>

                      {/* Start Turn-by-Turn Navigation */}
                      <a
                        href={correspondingLeg.googleMapsNavUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-2 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Start Nav</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
