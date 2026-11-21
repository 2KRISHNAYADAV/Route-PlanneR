import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Eye, ExternalLink, Ticket, CheckCircle } from 'lucide-react';
import { Place } from '../types/travel';
import { UDAIPUR_PLACES } from '../services/placesData';

interface PlacesDirectoryProps {
  onOpenPlaceDetail: (placeId: string) => void;
  onSelectOnMap: (place: Place) => void;
}

export const PlacesDirectory: React.FC<PlacesDirectoryProps> = ({
  onOpenPlaceDetail,
  onSelectOnMap
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const placesList = Object.values(UDAIPUR_PLACES);

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'heritage', label: 'Palaces & Heritage' },
    { id: 'lake', label: 'Lakes & Ghats' },
    { id: 'viewpoint', label: 'Hill Viewpoints' },
    { id: 'garden', label: 'Gardens' },
    { id: 'market', label: 'Markets' },
    { id: 'food', label: 'Food Spots' }
  ];

  const filteredPlaces = placesList.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (place.hindiName && place.hindiName.includes(searchQuery)) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-charcoal-900">
            Udaipur Places Directory
          </h2>
          <p className="text-xs text-sand-500 font-sans mt-0.5">
            Verified visiting details, entry fees, photography guidelines and coordinates for all trip stops.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-sand-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by monument name, lake, market, or keyword (e.g. Pichwai, Bahubali, Sunset)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-mewar-gold/50 bg-cream-50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaces.map(place => (
          <div
            key={place.id}
            className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-200 hover:border-sand-400 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Photo */}
              <div className="relative h-44 w-full bg-sand-200 overflow-hidden">
                {place.images && place.images[0] ? (
                  <img
                    src={place.images[0]}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sand-400">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-charcoal-900 shadow-sm">
                    {place.category}
                  </span>
                </div>

                {/* Entry fee pill */}
                <div className="absolute bottom-2 right-3">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-charcoal-900/90 text-white backdrop-blur-sm">
                    {place.entryFee.amount === 0 ? 'FREE' : `₹${place.entryFee.amount}`}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-base text-charcoal-900 line-clamp-1">
                  {place.name}
                </h3>
                {place.hindiName && (
                  <p className="text-xs text-sand-500 font-sans">{place.hindiName}</p>
                )}
                <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed font-sans">
                  {place.description}
                </p>

                {/* Timings */}
                <div className="pt-2 flex items-center gap-1.5 text-xs text-sand-500">
                  <Clock className="w-3.5 h-3.5 text-mewar-amber" />
                  <span>{place.openingHours.open} - {place.openingHours.close}</span>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 pt-0 border-t border-sand-100 flex items-center justify-between gap-2 mt-2">
              <button
                onClick={() => onOpenPlaceDetail(place.id)}
                className="text-xs font-bold text-mewar-amber hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Details</span>
              </button>

              <button
                onClick={() => onSelectOnMap(place)}
                className="px-3 py-1.5 rounded-xl bg-sand-100 hover:bg-mewar-gold hover:text-charcoal-950 text-charcoal-800 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <MapPin className="w-3 h-3" />
                <span>Locate on Map</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
