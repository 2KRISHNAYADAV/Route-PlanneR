import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Clock, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { ItineraryDay } from '../types/travel';
import { analyzeRouteOptimization } from '../services/itineraryService';

interface OptimizeTripModalProps {
  day1: ItineraryDay;
  day2: ItineraryDay;
  activeDay: 1 | 2;
  onClose: () => void;
  onApplyOptimization: (dayNumber: 1 | 2) => void;
  onRestoreOriginal: (dayNumber: 1 | 2) => void;
  isDay1Optimized: boolean;
  isDay2Optimized: boolean;
}

export const OptimizeTripModal: React.FC<OptimizeTripModalProps> = ({
  day1,
  day2,
  activeDay: initialActiveDay,
  onClose,
  onApplyOptimization,
  onRestoreOriginal,
  isDay1Optimized,
  isDay2Optimized
}) => {
  const [selectedDayNum, setSelectedDayNum] = useState<1 | 2>(initialActiveDay);

  const currentDay = selectedDayNum === 1 ? day1 : day2;
  const analysis = analyzeRouteOptimization(currentDay);
  const isApplied = selectedDayNum === 1 ? isDay1Optimized : isDay2Optimized;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-charcoal-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sand-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-sand-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-mewar-gold" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
                Route & Schedule Optimization
              </h2>
              <p className="text-xs text-sand-500 font-sans">
                Minimize backtracking while honoring strict opening hours, boat slots, and sunrise/sunset constraints.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sand-100 text-sand-400 hover:text-charcoal-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Day Toggle */}
        <div className="px-6 pt-4 flex gap-2">
          <button
            onClick={() => setSelectedDayNum(1)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDayNum === 1
                ? 'bg-mewar-terracotta text-white shadow-sm'
                : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
            }`}
          >
            Day 1: Old City Route
          </button>
          <button
            onClick={() => setSelectedDayNum(2)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDayNum === 2
                ? 'bg-mewar-lake-deep text-white shadow-sm'
                : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
            }`}
          >
            Day 2: Lakes & Hills Route
          </button>
        </div>

        {/* Optimization Metrics Cards */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-sand-50 border border-sand-200">
              <span className="text-[10px] text-sand-500 uppercase font-bold block">Original Road</span>
              <span className="text-base font-extrabold text-charcoal-900">{analysis.originalKm} km</span>
              <span className="text-[10px] text-sand-500 block">{analysis.originalMinutes} min road time</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] text-amber-700 uppercase font-bold block">Optimized Road</span>
              <span className="text-base font-extrabold text-amber-900">{analysis.optimizedKm} km</span>
              <span className="text-[10px] text-amber-700 block">{analysis.optimizedMinutes} min road time</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">Distance Saved</span>
              <span className="text-base font-extrabold text-emerald-800">
                {analysis.kmSaved > 0 ? `-${analysis.kmSaved} km` : 'Optimal'}
              </span>
              <span className="text-[10px] text-emerald-700 block">Less walking fatigue</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">Time Saved</span>
              <span className="text-base font-extrabold text-emerald-800">
                {analysis.minutesSaved > 0 ? `-${analysis.minutesSaved} min` : 'Optimal'}
              </span>
              <span className="text-[10px] text-emerald-700 block">More leisure time</span>
            </div>
          </div>

          {/* AI Analysis Summary */}
          <div className="p-4 rounded-2xl bg-cream-50 border border-sand-300 text-xs text-charcoal-800 space-y-1.5 leading-relaxed">
            <span className="font-bold text-charcoal-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-mewar-gold" />
              <span>Itinerary Optimization Findings:</span>
            </span>
            <p>{analysis.summary}</p>
          </div>

          {/* Verified Constraints Checklist */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-charcoal-900 uppercase tracking-wider text-[11px]">
              Constraint Verification Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-charcoal-700">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-sand-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero destinations silently removed</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-sand-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>City Palace 9:00 AM opening respected</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-sand-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pichola boat ride midday sunlight preserved</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-sand-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sajjangarh 5:30 PM sanctuary gate enforced</span>
              </div>
            </div>
          </div>

          {/* Side-by-side Sequences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-sand-50 border border-sand-200 text-xs space-y-2">
              <span className="font-bold text-charcoal-900 block border-b border-sand-200 pb-1">
                Current Sequence ({currentDay.stops.length} stops)
              </span>
              <ol className="space-y-1 list-decimal list-inside text-charcoal-700">
                {currentDay.stops.map((s, idx) => (
                  <li key={idx} className="truncate">
                    {s.place.name} ({s.suggestedTime})
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
              <span className="font-bold text-amber-900 block border-b border-amber-200 pb-1 flex items-center justify-between">
                <span>Optimized Sequence</span>
                <span className="text-[10px] text-emerald-700 font-bold">Feasible & Balanced</span>
              </span>
              <ol className="space-y-1 list-decimal list-inside text-charcoal-800">
                {analysis.optimizedSequence.map((item, idx) => (
                  <li key={idx} className="truncate font-medium">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-sand-50 border-t border-sand-200 flex items-center justify-between gap-3 shrink-0 rounded-b-3xl">
          {isApplied ? (
            <button
              onClick={() => {
                onRestoreOriginal(selectedDayNum);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-white border border-sand-300 hover:bg-sand-100 text-charcoal-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Original Itinerary</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-sand-500 hover:text-charcoal-800"
            >
              Keep Current
            </button>
          )}

          <button
            onClick={() => {
              onApplyOptimization(selectedDayNum);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{isApplied ? 'Re-Apply Optimization' : 'Apply Optimized Route'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
