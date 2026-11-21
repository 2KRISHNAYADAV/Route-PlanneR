import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Ticket, 
  Camera, 
  ShieldAlert, 
  Utensils, 
  Compass, 
  ExternalLink, 
  Calendar,
  CheckCircle,
  HelpCircle,
  Navigation
} from 'lucide-react';
import { Place } from '../types/travel';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  onOpenMapToPlace: (place: Place) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  onOpenMapToPlace
}) => {
  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-charcoal-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sand-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo & Close Button */}
        <div className="relative h-60 sm:h-72 w-full bg-sand-200 overflow-hidden shrink-0">
          {place.images && place.images[0] ? (
            <img 
              src={place.images[0]} 
              alt={place.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-sand-300 text-sand-500">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-900 transition-all shadow-md"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Place Category Badge & Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-mewar-gold text-charcoal-950">
                {place.category}
              </span>
              {place.entryFee.isVerified && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified Info
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
              {place.name}
            </h2>
            {place.hindiName && (
              <p className="text-sm font-sans text-sand-200">{place.hindiName}</p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 text-charcoal-900">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-cream-50 rounded-2xl border border-sand-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-sand-500 block">Entry Fee</span>
              <span className="font-extrabold text-charcoal-900">
                {place.entryFee.amount === 0 ? 'FREE' : `₹${place.entryFee.amount}`}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-sand-500 block">Opening Hours</span>
              <span className="font-extrabold text-charcoal-900">{place.openingHours.open} - {place.openingHours.close}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-sand-500 block">Visit Duration</span>
              <span className="font-extrabold text-charcoal-900">
                {place.estimatedVisitDurationMinutes ? `${place.estimatedVisitDurationMinutes} min` : 'Flexible'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-sand-500 block">Coordinates</span>
              <span className="font-bold text-sand-500">
                {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Description & History */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sand-500 mb-1.5">Overview</h4>
            <p className="text-sm text-charcoal-800 leading-relaxed font-sans">{place.description}</p>
          </div>

          {place.historicalSignificance && (
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-mewar-ruby mb-1">
                Historical Significance
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                {place.historicalSignificance}
              </p>
            </div>
          )}

          {/* Timings & Entry Verification Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-sand-200 space-y-1">
              <span className="font-bold text-charcoal-900 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-mewar-amber" />
                <span>Ticket & Entry Details</span>
              </span>
              <p className="text-charcoal-700 leading-normal">{place.entryFee.notes || 'Standard ticket rules apply.'}</p>
              <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                <CheckCircle className="w-3 h-3" />
                <span>Verified for Solo Budget Travelers</span>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-sand-200 space-y-1">
              <span className="font-bold text-charcoal-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-mewar-amber" />
                <span>Opening Hours & Last Entry</span>
              </span>
              <p className="text-charcoal-700 leading-normal">
                {place.openingHours.lastEntry || place.openingHours.notes || `${place.openingHours.open} - ${place.openingHours.close}`}
              </p>
            </div>
          </div>

          {/* Photography Tips */}
          {place.photographyTips && place.photographyTips.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-charcoal-800 mb-2 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-mewar-amber" />
                <span>Photography Recommendations</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-charcoal-700">
                {place.photographyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-cream-50 p-2 rounded-lg border border-sand-200">
                    <span className="text-mewar-gold font-bold">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety & Precautions */}
          {place.safetyAdvice && place.safetyAdvice.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-rose-800 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Safety Precautions & Practical Advice</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-rose-950">
                {place.safetyAdvice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-rose-50/70 p-2.5 rounded-xl border border-rose-200">
                    <span className="text-rose-600 font-bold">!</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nearby Food & Transport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {place.nearbyFood && place.nearbyFood.length > 0 && (
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <h5 className="font-bold text-charcoal-900 mb-1.5 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-mewar-amber" />
                  <span>Nearby Food & Chai</span>
                </h5>
                <ul className="space-y-1 text-charcoal-700">
                  {place.nearbyFood.map((food, i) => (
                    <li key={i}>• {food}</li>
                  ))}
                </ul>
              </div>
            )}

            {place.transportOptions && place.transportOptions.length > 0 && (
              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                <h5 className="font-bold text-charcoal-900 mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-mewar-amber" />
                  <span>Transport & Access</span>
                </h5>
                <ul className="space-y-1 text-charcoal-700">
                  {place.transportOptions.map((tr, i) => (
                    <li key={i}>• {tr}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Last checked audit info */}
          <div className="text-[11px] text-sand-500 pt-2 border-t border-sand-200 flex flex-wrap items-center justify-between gap-2">
            <span>Information audit date: <strong>{place.lastCheckedDate}</strong></span>
            {place.officialWebsite && (
              <a
                href={place.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mewar-amber hover:underline font-bold flex items-center gap-1"
              >
                <span>Official Booking / Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-sand-50 border-t border-sand-200 flex items-center justify-between gap-3 shrink-0 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-sand-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onOpenMapToPlace(place);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Show on Interactive Road Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
