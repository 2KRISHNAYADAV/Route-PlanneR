import React, { useEffect, useState } from 'react';
import { 
  CloudSun, 
  Thermometer, 
  Sunrise, 
  Sunset, 
  Wind, 
  Droplets, 
  ShieldAlert, 
  Compass, 
  Footprints, 
  AlertTriangle,
  Shirt,
  Moon,
  RefreshCw
} from 'lucide-react';
import { WeatherData } from '../types/travel';
import { fetchUdaipurWeather } from '../services/weatherService';

export const WeatherAndSafety: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const loadWeather = async () => {
    setIsLoading(true);
    const data = await fetchUdaipurWeather();
    setWeather(data);
    setIsLoading(false);
    setHasAttempted(true);
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-mewar-lake text-white">
              Climate & Travel Readiness
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-charcoal-900">
            Udaipur Weather & Safety Precautions
          </h2>
          <p className="text-xs text-sand-500 font-sans mt-0.5">
            Real-time meteorological conditions for Udaipur (24.5854° N, 73.7125° E), solar timings, and hiking protocols.
          </p>
        </div>

        <button
          onClick={loadWeather}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Weather</span>
        </button>
      </div>

      {/* Live Weather Card */}
      {weather && weather.isLive ? (
        <div className="bg-gradient-to-r from-amber-500/10 via-cream-50 to-blue-500/10 p-5 rounded-2xl border border-sand-200 shadow-luxury space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-mewar-amber border border-sand-200">
                <CloudSun className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-extrabold text-charcoal-900">
                    {weather.currentTemp}°C
                  </span>
                  <span className="text-xs text-sand-500">
                    Feels like {weather.apparentTemp}°C
                  </span>
                </div>
                <p className="text-xs font-bold text-charcoal-800">
                  {weather.weatherDescription} · Udaipur
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-sand-500">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">
                LIVE METEO FEED
              </span>
              <p className="mt-1">Last synced: {weather.lastUpdated}</p>
            </div>
          </div>

          {/* Meteorological Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-sand-200">
            <div className="p-3 bg-white/80 rounded-xl border border-sand-200 flex items-center gap-2.5">
              <Sunrise className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-[10px] text-sand-500 uppercase font-bold block">Sunrise</span>
                <span className="font-extrabold text-charcoal-900">{weather.sunrise}</span>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-sand-200 flex items-center gap-2.5">
              <Sunset className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="text-[10px] text-sand-500 uppercase font-bold block">Sunset</span>
                <span className="font-extrabold text-charcoal-900">{weather.sunset}</span>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-sand-200 flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <span className="text-[10px] text-sand-500 uppercase font-bold block">Rain Chance</span>
                <span className="font-extrabold text-charcoal-900">{weather.rainProbability}%</span>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-sand-200 flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-teal-500 shrink-0" />
              <div>
                <span className="text-[10px] text-sand-500 uppercase font-bold block">Wind Speed</span>
                <span className="font-extrabold text-charcoal-900">{weather.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>
      ) : hasAttempted ? (
        <div className="bg-sand-50 border border-sand-300 text-charcoal-800 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Live weather stream temporarily unavailable</p>
            <p className="text-sand-600">
              Udaipur in late November is typically mild and sunny (14°C - 27°C) with low humidity and negligible rain. Mornings and evenings are crisp; afternoons are comfortably warm.
            </p>
          </div>
        </div>
      ) : null}

      {/* Safety & Essential Trip Precautions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bahubali Hills Precautions */}
        <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base text-charcoal-900">
              Bahubali Hills Sunrise Hiking Safety
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-charcoal-700">
            <li className="flex items-start gap-2">
              <strong className="text-mewar-terracotta">1. Footwear:</strong>
              <span>Wear proper sneakers with deep tread. The trail has loose gravel, smooth shale rock, and steep unpaved sections. Avoid sandals or slippers.</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-mewar-terracotta">2. Departure Timing:</strong>
              <span>Leave Dreamyard strictly by 06:00 AM. Sunrise happens between 06:45 AM - 07:00 AM; the trail takes 15-20 minutes of steady climbing.</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-mewar-terracotta">3. Return Transport:</strong>
              <span>Pre-book your auto-rickshaw or taxi for round-trip with waiting. Early morning return vehicles are non-existent at Badi Lake.</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-mewar-terracotta">4. Wildlife:</strong>
              <span>Keep snacks zipped inside your backpack. Langurs congregate near the base temple; do not feed or provoke them.</span>
            </li>
          </ul>
        </div>

        {/* Sajjangarh Monsoon Palace Timings */}
        <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base text-charcoal-900">
              Sajjangarh Sanctuary & Sunset Strict Rules
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-charcoal-700">
            <li className="flex items-start gap-2">
              <strong className="text-rose-700">1. Gate Cut-Off:</strong>
              <span>The base entry gate at Sajjangarh Wildlife Sanctuary strictly halts ticketing at 05:00 - 05:30 PM. Arrive at base by 03:30 PM.</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-rose-700">2. Mountain Shuttle:</strong>
              <span>Ordinary bikes or overloaded autos cannot climb the steep hairpin pass; use official forest electric shuttles (₹100-₹150 round trip).</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-rose-700">3. Post-Sunset Departure:</strong>
              <span>Forest guards blow departure whistles 15 minutes after sunset (~06:00 PM). Descend promptly to the base shuttle station.</span>
            </li>
          </ul>
        </div>

        {/* Clothing & Hydration Advice */}
        <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Shirt className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base text-charcoal-900">
              Suggested Clothing & Hydration
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-charcoal-700">
            <li className="flex items-start gap-2">
              <span className="text-mewar-gold font-bold">✦</span>
              <span><strong>Layering is key:</strong> A light jacket or hoodie for 6:00 AM dawn at Bahubali Hills and evening rooftop breezes; breathable cotton t-shirt for midday sunshine.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mewar-gold font-bold">✦</span>
              <span><strong>Temple Modesty:</strong> Cover shoulders and knees when climbing Jagdish Temple. Slip-on shoes are convenient as shoes are removed outside temples.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mewar-gold font-bold">✦</span>
              <span><strong>Hydration:</strong> Carry a 1-liter reusable steel water bottle; refill at Dreamyard water filters to save money and cut plastic waste.</span>
            </li>
          </ul>
        </div>

        {/* Night Precautions & Solitude Safety */}
        <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Moon className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base text-charcoal-900">
              Night Walking & Solo Budget Travel Tips
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-charcoal-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span><strong>Old City Pedestrian Safety:</strong> Chandpole footbridge and ghat walkways are safe and lit until 11:00 PM. Watch for occasional two-wheelers in blind turns.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span><strong>Station Prepaid Autos:</strong> For your return train to Vadodara from Udaipur City Station, rely on the official prepaid auto booth on platform 1 (approx ₹100-₹120).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span><strong>Emergency Contact:</strong> Keep Udaipur Tourist Police helpline (112 / +91-294-2411500) and Dreamyard reception contact saved.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
