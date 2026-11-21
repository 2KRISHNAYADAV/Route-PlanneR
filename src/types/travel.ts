export type TravelMode = 'walking' | 'driving' | 'two_wheeler' | 'transit' | 'auto_taxi';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  hindiName?: string;
  category: 'heritage' | 'lake' | 'temple' | 'viewpoint' | 'garden' | 'market' | 'food' | 'hotel';
  coordinates: Coordinates;
  address: string;
  description: string;
  historicalSignificance: string;
  estimatedVisitDurationMinutes: number;
  entryFee: {
    amount: number;
    currency: string;
    isVerified: boolean;
    notes?: string;
  };
  openingHours: {
    open: string;
    close: string;
    lastEntry?: string;
    notes?: string;
    isVerified: boolean;
  };
  photographyTips: string[];
  safetyAdvice: string[];
  nearbyFood: string[];
  transportOptions: string[];
  officialWebsite?: string;
  images: string[];
  rating?: number;
  tags: string[];
  lastCheckedDate: string; // ISO date string
}

export interface NavigationManeuver {
  instruction: string;
  distanceKm: number;
  durationMin: number;
  maneuverType?: string;
  streetName?: string;
}

export interface RouteLeg {
  id: string;
  fromStopId: string;
  toStopId: string;
  fromName: string;
  toName: string;
  travelMode: TravelMode;
  distanceKm: number;
  durationMinutes: number;
  roadCoordinates: [number, number][]; // [lat, lng] array along the real road network
  maneuvers: NavigationManeuver[];
  googleMapsNavUrl: string;
  isReturnToHotel?: boolean;
}

export interface ItineraryStop {
  stopNumber: number; // 0 for start (Dreamyard), 1, 2, ...
  placeId: string;
  place: Place;
  suggestedTime: string; // e.g. "09:00 AM"
  departureTime?: string;
  isCompleted: boolean;
  notes?: string;
  recommendedTravelModeToNext: TravelMode;
}

export interface ItineraryDay {
  dayNumber: 1 | 2;
  date: string; // e.g. "2026-11-24"
  title: string;
  theme: string;
  stops: ItineraryStop[];
  legs: RouteLeg[];
  totalDistanceKm: number;
  totalTravelMinutes: number;
}

export type BudgetCategory = 
  | 'train_to_udaipur'
  | 'train_return'
  | 'hostel'
  | 'food'
  | 'local_transport'
  | 'sightseeing_tickets'
  | 'boat_ride'
  | 'shopping'
  | 'emergency_reserve';

export interface BudgetAllocation {
  category: BudgetCategory;
  name: string;
  plannedAmount: number;
  color: string;
  iconName: string;
}

export interface Expense {
  id: string;
  category: BudgetCategory;
  amount: number;
  title: string;
  date: string; // "2026-11-24" or current date
  notes?: string;
  dayNumber?: 1 | 2;
}

export interface WeatherData {
  currentTemp: number;
  apparentTemp: number;
  weatherDescription: string;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  sunrise: string;
  sunset: string;
  isLive: boolean;
  lastUpdated: string;
}

export interface UserLocation {
  coordinates: Coordinates;
  accuracyMeters: number;
  timestamp: number;
  nearestStop?: ItineraryStop;
  distanceToNearestKm?: number;
}
