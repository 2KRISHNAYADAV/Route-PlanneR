import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Compass, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Navigation, 
  Hotel,
  Sun,
  Sunset,
  Sunrise,
  Moon,
  Utensils,
  Footprints,
  Car,
  ShieldCheck,
  AlertCircle,
  Eye,
  Camera,
  Coffee,
  Ticket
} from 'lucide-react';
import { ItineraryDay, Expense } from '../types/travel';
import { calculateBudgetSummary } from '../services/budgetService';
import { getTripProgress } from '../services/itineraryService';

interface TripOverviewProps {
  day1: ItineraryDay;
  day2: ItineraryDay;
  expenses: Expense[];
  onSelectTab: (tabId: string) => void;
  onOpenPlaceDetail: (placeId: string) => void;
}

export const TripOverview: React.FC<TripOverviewProps> = ({
  day1,
  day2,
  expenses,
  onSelectTab,
  onOpenPlaceDetail
}) => {
  const [selectedTimelineDay, setSelectedTimelineDay] = useState<1 | 2>(1);
  const budgetSummary = calculateBudgetSummary(expenses);
  const progress = getTripProgress(day1, day2);

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      {/* Hero Welcome Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg border border-sand-200 bg-charcoal-950 text-white min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-5 sm:p-8">
        {/* Background Image with Atmospheric Luxury Gradient */}
        <img
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80"
          alt="Udaipur City Palace and Lake Pichola"
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/65 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-mewar-gold text-charcoal-950 shadow-sm">
              Smart Solo Travel Plan
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md text-sand-100 border border-white/20">
              24 – 25 November 2026
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              ₹5,000 Total Budget
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight">
            Udaipur Smart Route Planner
          </h1>

          <p className="text-xs sm:text-sm text-sand-200 font-sans leading-relaxed">
            Precision road navigation, authentic local Mewari food, zero unnecessary backtracking, and a seamless morning-to-night journey starting and ending at <strong>Dreamyard Udaipur</strong> on Lake Pichola.
          </p>

          {/* Quick CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onSelectTab('map')}
              className="px-5 py-3 rounded-2xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 text-xs font-extrabold flex items-center gap-2 shadow-glow-gold transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Open Interactive Road Map</span>
            </button>

            <button
              onClick={() => onSelectTab('day1')}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>Explore Day 1 Itinerary</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stats Highlights Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold text-sand-500 block">Base Camp Hotel</span>
          <p className="font-serif font-bold text-base text-charcoal-900 mt-0.5 truncate">Dreamyard Udaipur</p>
          <p className="text-[11px] text-sand-500">Hanuman Ghat · Lake Pichola</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold text-sand-500 block">Trip Budget Status</span>
          <p className="font-serif font-bold text-base text-charcoal-900 mt-0.5">
            ₹{budgetSummary.remainingMoney} <span className="text-xs font-normal text-sand-500">/ ₹5,000</span>
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold">{budgetSummary.percentageSpent}% utilized</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold text-sand-500 block">Sightseeing Progress</span>
          <p className="font-serif font-bold text-base text-charcoal-900 mt-0.5">
            {progress.completedCount} of {progress.totalSightseeingStops} Stops
          </p>
          <p className="text-[11px] text-amber-700 font-semibold">{progress.percentage}% completed</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold text-sand-500 block">Next Destination</span>
          <p className="font-serif font-bold text-base text-charcoal-900 mt-0.5 truncate">
            {progress.nextUpcomingStop ? progress.nextUpcomingStop.place.name : 'All Done!'}
          </p>
          <p className="text-[11px] text-sand-500 truncate">
            {progress.nextUpcomingStop ? progress.nextUpcomingStop.suggestedTime : 'Rest & return'}
          </p>
        </div>
      </div>

      {/* 24-HOUR MASTER JOURNEY FLOW (Morning -> Midday -> Evening -> Night Sleep) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-luxury border border-sand-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sand-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-mewar-terracotta text-white">
                Complete 24-Hour Rhythm
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
              Morning to Night Master Travel Plan
            </h2>
            <p className="text-xs text-sand-500 font-sans">
              Exact schedule, where to eat, where to sleep, and sunset timings.
            </p>
          </div>

          {/* Toggle Day 1 vs Day 2 Master Flow */}
          <div className="flex items-center bg-sand-100 p-1 rounded-2xl text-xs font-bold shrink-0">
            <button
              onClick={() => setSelectedTimelineDay(1)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedTimelineDay === 1
                  ? 'bg-mewar-terracotta text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-black'
              }`}
            >
              Day 1 Schedule
            </button>
            <button
              onClick={() => setSelectedTimelineDay(2)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedTimelineDay === 2
                  ? 'bg-mewar-lake-deep text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-black'
              }`}
            >
              Day 2 Schedule
            </button>
          </div>
        </div>

        {selectedTimelineDay === 1 ? (
          /* Day 1: 24-Hour Flow */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            {/* Morning */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Sunrise className="w-4 h-4 text-amber-600" />
                  <span>MORNING (08:30 - 11:30)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-amber-900 border">Palace Gate</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Old City & City Palace</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Freshen up at <strong>Dreamyard Hostel</strong>. Walk 800m across Chandpole footbridge to <strong>City Palace</strong> at 9:00 AM opening to beat tour crowds. Visit Mor Chowk & Zenana Mahal, then seek blessings at <strong>Jagdish Temple</strong>.
              </p>
              <div className="text-[11px] text-amber-900 font-medium pt-1">
                <strong>Breakfast tip:</strong> Hot Pyaz Kachori & Poha at JMB (₹50).
              </div>
            </div>

            {/* Midday */}
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-orange-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-orange-600" />
                  <span>MIDDAY (12:00 - 03:30)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-orange-900 border">Thali & Safari</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Dal Baati & Boat Ride</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Enjoy authentic Desi Ghee Dal Baati Churma at <strong>Krishna Restro</strong> (~₹180). Walk down to <strong>Gangaur Ghat</strong>, then board the 2:00 PM shared boat safari from Rameshwar Jetty for direct sunlit Taj Lake Palace photos.
              </p>
              <div className="text-[11px] text-orange-900 font-medium pt-1">
                <strong>Midday rest:</strong> Return 400m to Dreamyard for 45 min nap & recharge.
              </div>
            </div>

            {/* Evening */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-rose-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Sunset className="w-4 h-4 text-rose-600" />
                  <span>EVENING (04:30 - 07:00)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-rose-900 border">Bazaars & Art</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Bada Bazaar & Hathipole</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Walk through historic Clock Tower into <strong>Bada Bazaar</strong> for camel leather mojris and dupattas. Head north to <strong>Hathipole</strong> for genuine stone-pigment Pichwai cloth paintings.
              </p>
              <div className="text-[11px] text-rose-900 font-medium pt-1">
                <strong>Bargaining:</strong> Offer 60-70% of quoted price politely.
              </div>
            </div>

            {/* Night */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-purple-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-purple-600" />
                  <span>NIGHT (07:30 - 10:30)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-purple-900 border">Dinner & Sleep</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Chandpole Dinner & Rest</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Savor Sev Tamatar & tandoori rotis near Chandpole Gate (~₹140). Stroll across the illuminated footbridge back to <strong>Dreamyard Hostel</strong>. Soak in illuminated palace night views from the rooftop, then sleep early for tomorrow's 6 AM sunrise!
              </p>
              <div className="text-[11px] text-purple-900 font-medium pt-1">
                <strong>Where to sleep:</strong> Dreamyard lakeview dorm/room.
              </div>
            </div>
          </div>
        ) : (
          /* Day 2: 24-Hour Flow */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            {/* Morning */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Sunrise className="w-4 h-4 text-blue-600" />
                  <span>DAWN (06:00 - 08:30)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-blue-900 border">Sunrise Hike</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Bahubali Hills Sunrise</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Leave Dreamyard strictly at 06:00 AM via pre-arranged auto/cab. Arrive at Badi Lake trailhead by 6:30 AM; 15-min trek up the ridge for an unforgettable 360° dawn sunrise over the Aravalli peaks.
              </p>
              <div className="text-[11px] text-blue-900 font-medium pt-1">
                <strong>Safety:</strong> Wear grip sneakers (loose shale rocks). Hot tea at base parking.
              </div>
            </div>

            {/* Midday */}
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-teal-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-teal-600" />
                  <span>MIDDAY (09:00 - 01:30)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-teal-900 border">Gardens & Lakes</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Saheliyon Ki Bari & Paal</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Arrive at <strong>Saheliyon Ki Bari</strong> right at 9:00 AM opening (marble elephant fountains & lotus pools · ₹20). Walk 1.4 km to <strong>Fateh Sagar Paal</strong> promenade. Enjoy Vipin Cold Coffee and lake breeze.
              </p>
              <div className="text-[11px] text-teal-900 font-medium pt-1">
                <strong>Lunch:</strong> Famous butter pav bhaji & kulfi at Sukhadia Circle (~₹120).
              </div>
            </div>

            {/* Afternoon Sunset */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Sunset className="w-4 h-4 text-amber-600" />
                  <span>AFTERNOON (03:30 - 06:15)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-amber-900 border">Fortress Sunset</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Sajjangarh Monsoon Palace</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Depart Sukhadia Circle by 3:15 PM. Arrive at sanctuary base gate before 4:00 PM (<strong>Strict: gates close by 5:30 PM!</strong>). Take official electric shuttle up the hairpin mountain pass. Watch glorious golden sunset over lakes!
              </p>
              <div className="text-[11px] text-amber-900 font-medium pt-1">
                <strong>Descent:</strong> Descend right after sunset with forest shuttle.
              </div>
            </div>

            {/* Night Departure */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-indigo-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>NIGHT (06:45 - 10:30)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-indigo-900 border">Train Departure</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-charcoal-900">Dreamyard & Vadodara Train</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Auto back to Dreamyard to pick up backpack and freshen up. Quick farewell rooftop view. Take prepaid auto (₹100) to <strong>Udaipur City Railway Station</strong>. Board overnight train back to Vadodara Junction!
              </p>
              <div className="text-[11px] text-indigo-900 font-medium pt-1">
                <strong>Farewell meal:</strong> Hot thali at Natraj near station (~₹180).
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two Days Overview Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Day 1 Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-luxury border border-sand-200 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-mewar-terracotta text-white">
                Day 1 · 24 Nov 2026
              </span>
              <span className="text-xs font-bold text-sand-500">
                {day1.totalDistanceKm} km · Walking Focus
              </span>
            </div>

            <h3 className="font-serif font-bold text-xl text-charcoal-900">
              Old City, Heritage Palaces & Lake Pichola
            </h3>

            <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
              Commence from Dreamyard at Hanuman Ghat, walk across Chandpole footbridge to the magnificent City Palace at 9 AM opening, seek blessings at Jagdish Temple, savor authentic Krishna Dal Baati Churma, take a midday boat safari from Rameshwar Ghat pier, and explore Bada Bazaar and Hathipole art markets.
            </p>

            {/* Stops Mini-List */}
            <div className="space-y-1.5 pt-2 text-xs">
              {day1.stops.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-sand-50/70 border border-sand-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sand-200 text-charcoal-800 text-[10px] font-bold flex items-center justify-center">
                      {s.stopNumber === 0 ? 'H' : s.stopNumber}
                    </span>
                    <span className="font-medium text-charcoal-900 truncate max-w-[200px]">
                      {s.place.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-sand-500 font-semibold">{s.suggestedTime}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-sand-100 flex items-center justify-between">
            <button
              onClick={() => onSelectTab('day1')}
              className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Day 1 Itinerary</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-sand-500 font-medium">9 Waypoints</span>
          </div>
        </div>

        {/* Day 2 Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-luxury border border-sand-200 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-mewar-lake-deep text-white">
                Day 2 · 25 Nov 2026
              </span>
              <span className="text-xs font-bold text-sand-500">
                {day2.totalDistanceKm} km · Auto & Scenic Drive
              </span>
            </div>

            <h3 className="font-serif font-bold text-xl text-charcoal-900">
              Lakes, Fountains, Hilltops & Monsoon Palace
            </h3>

            <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
              Early 6:00 AM departure to Bahubali Hills for the iconic Badi Lake sunrise trek, downhill stroll through the marble fountains of Saheliyon Ki Bari at 9 AM opening, lakeside promenade walking at Fateh Sagar Paal, midday street food at Sukhadia Circle, and ascending the Bansdara peak for sunset at Sajjangarh Monsoon Palace.
            </p>

            {/* Stops Mini-List */}
            <div className="space-y-1.5 pt-2 text-xs">
              {day2.stops.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-sand-50/70 border border-sand-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sand-200 text-charcoal-800 text-[10px] font-bold flex items-center justify-center">
                      {s.stopNumber === 0 ? 'H' : s.stopNumber}
                    </span>
                    <span className="font-medium text-charcoal-900 truncate max-w-[200px]">
                      {s.place.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-sand-500 font-semibold">{s.suggestedTime}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-sand-100 flex items-center justify-between">
            <button
              onClick={() => onSelectTab('day2')}
              className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Day 2 Itinerary</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-sand-500 font-medium">6 Waypoints</span>
          </div>
        </div>
      </div>
    </div>
  );
};
