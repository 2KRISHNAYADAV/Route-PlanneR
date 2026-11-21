import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Star, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Filter, 
  Compass, 
  Coins,
  CheckCircle,
  Clock
} from 'lucide-react';
import { UDAIPUR_FOOD_SPOTS, UDAIPUR_MARKETS, FoodSpot } from '../services/foodData';

interface FoodAndMarketsProps {
  onNavigateToCoords: (lat: number, lng: number, title: string) => void;
}

export const FoodAndMarkets: React.FC<FoodAndMarketsProps> = ({
  onNavigateToCoords
}) => {
  const [activeTab, setActiveTab] = useState<'food' | 'markets'>('food');
  const [foodCategory, setFoodCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  // Filter & sort food spots
  const filteredFood = UDAIPUR_FOOD_SPOTS.filter(spot => {
    const matchesCategory = foodCategory === 'all' || spot.category === foodCategory;
    const matchesPrice = spot.avgCostPerPerson <= maxPrice;
    return matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'distance') return a.distanceFromDreamyardKm - b.distanceFromDreamyardKm;
    if (sortBy === 'price') return a.avgCostPerPerson - b.avgCostPerPerson;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header and Category Switcher */}
      <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-mewar-terracotta text-white">
              Culinary & Craft Experience
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-charcoal-900">
            Authentic Food & Local Markets
          </h2>
          <p className="text-xs text-sand-500 font-sans mt-0.5">
            Handpicked authentic Mewari Dal Baati, unlimited thalis, lakeside coffee, and historic bazaars.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-sand-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'food' 
                ? 'bg-white text-charcoal-900 shadow-sm' 
                : 'text-sand-500 hover:text-charcoal-800'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Food & Cafés ({UDAIPUR_FOOD_SPOTS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('markets')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'markets' 
                ? 'bg-white text-charcoal-900 shadow-sm' 
                : 'text-sand-500 hover:text-charcoal-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Traditional Markets ({UDAIPUR_MARKETS.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'food' ? (
        <div className="space-y-4">
          {/* Controls Bar for Food */}
          <div className="bg-cream-50 p-4 rounded-2xl border border-sand-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Eats' },
                { id: 'dal_baati', label: 'Dal Baati Churma' },
                { id: 'thali', label: 'Unlimited Thalis' },
                { id: 'street_food', label: 'Street Snacks' },
                { id: 'chai_cafe', label: 'Lakeside Coffee & Chai' },
                { id: 'budget_cafe', label: 'Healthy Mewari' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFoodCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    foodCategory === cat.id
                      ? 'bg-charcoal-900 text-white'
                      : 'bg-white text-charcoal-700 border border-sand-200 hover:bg-sand-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort & Price Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-sand-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'distance' | 'price' | 'rating')}
                  className="bg-white border border-sand-300 rounded-lg px-2.5 py-1 text-xs text-charcoal-800 focus:outline-none"
                >
                  <option value="distance">1. Distance from Hostel</option>
                  <option value="price">2. Lowest Price First</option>
                  <option value="rating">3. Highest Rating</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-sand-500 font-medium">Budget:</span>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="bg-white border border-sand-300 rounded-lg px-2.5 py-1 text-xs text-charcoal-800 focus:outline-none"
                >
                  <option value={100}>Under ₹100</option>
                  <option value={150}>Under ₹150</option>
                  <option value={250}>Under ₹250</option>
                  <option value={300}>All Budget (≤₹300)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFood.map(spot => (
              <div
                key={spot.id}
                className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-200 hover:border-sand-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-sand-200 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-charcoal-900 shadow">
                        ~₹{spot.avgCostPerPerson} / person
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-3 flex items-center gap-1 bg-charcoal-900/90 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{spot.rating}</span>
                      <span className="text-sand-300 font-normal text-[10px]">({spot.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-serif font-bold text-base text-charcoal-900">
                      {spot.name}
                    </h3>
                    {spot.hindiName && (
                      <p className="text-xs text-sand-500 font-sans">{spot.hindiName}</p>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-charcoal-700">
                      <MapPin className="w-3.5 h-3.5 text-mewar-terracotta shrink-0" />
                      <span>{spot.distanceFromDreamyardKm} km from Dreamyard ({spot.nearestStop})</span>
                    </div>

                    <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed font-sans">
                      {spot.description}
                    </p>

                    {/* Famous Dishes Tags */}
                    <div className="pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-sand-500 mb-1">
                        Must-Try Specialties:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {spot.famousDishes.map((dish, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-cream-50 border border-sand-200 text-[10px] text-charcoal-800 font-medium"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-4 pt-2 border-t border-sand-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-sand-500">
                    <Clock className="w-3 h-3 text-sand-400" />
                    <span>{spot.openingHours}</span>
                  </div>

                  <a
                    href={spot.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-sand-100 hover:bg-mewar-gold hover:text-charcoal-950 text-charcoal-800 font-semibold text-xs flex items-center gap-1 transition-all"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Markets View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {UDAIPUR_MARKETS.map(market => (
            <div
              key={market.id}
              className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-sand-200 overflow-hidden">
                  <img
                    src={market.image}
                    alt={market.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="font-serif font-bold text-lg">{market.name}</h3>
                    <p className="text-xs text-sand-200">{market.hindiName}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 text-sand-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-mewar-terracotta shrink-0" />
                    <span>{market.distanceFromDreamyardKm} km from Dreamyard · {market.address}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-1">What to Buy & Souvenirs:</h4>
                    <ul className="space-y-1 text-charcoal-700">
                      {market.speciality.map((spec, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-mewar-gold font-bold">✦</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-amber-900 space-y-1">
                    <span className="font-bold block flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span>Smart Bargaining Tip:</span>
                    </span>
                    <p className="text-[11px] leading-relaxed">{market.bargainingTips}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-sand-100 flex items-center justify-between">
                <span className="text-[11px] text-sand-500">Best: {market.bestTimeToVisit}</span>
                <a
                  href={market.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-sand-100 hover:bg-mewar-gold hover:text-charcoal-950 text-charcoal-800 font-semibold text-xs flex items-center gap-1 transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
