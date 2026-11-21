export interface FoodSpot {
  id: string;
  name: string;
  hindiName?: string;
  category: 'thali' | 'dal_baati' | 'street_food' | 'chai_cafe' | 'budget_cafe';
  priceCategory: 'under_100' | 'under_150' | 'under_250';
  avgCostPerPerson: number;
  rating: number;
  reviewCount: number;
  address: string;
  distanceFromDreamyardKm: number;
  nearestStop: string;
  coordinates: { lat: number; lng: number };
  famousDishes: string[];
  description: string;
  openingHours: string;
  image: string;
  googleMapsUrl: string;
}

export interface MarketSpot {
  id: string;
  name: string;
  hindiName?: string;
  address: string;
  distanceFromDreamyardKm: number;
  speciality: string[];
  bargainingTips: string;
  bestTimeToVisit: string;
  coordinates: { lat: number; lng: number };
  image: string;
  googleMapsUrl: string;
}

export const UDAIPUR_FOOD_SPOTS: FoodSpot[] = [
  {
    id: 'krishna-dal-bati',
    name: 'Krishna Dal Bati Restro',
    hindiName: 'कृष्णा दाल बाटी',
    category: 'dal_baati',
    priceCategory: 'under_250',
    avgCostPerPerson: 180,
    rating: 4.6,
    reviewCount: 3420,
    address: 'Near Jagdish Temple / Jalsham Chowk, Old City',
    distanceFromDreamyardKm: 0.35,
    nearestStop: 'Jagdish Temple (Day 1 Stop 2)',
    coordinates: { lat: 24.5802, lng: 73.6848 },
    famousDishes: ['Desi Ghee Dal Baati Churma', 'Panchmel Dal', 'Gatte Ki Sabzi', 'Garlic Chutney'],
    description: 'The golden standard for traditional Mewari Dal Baati. Unpretentious, quick seating, endless refills of piping hot dal and spicy garlic chutney.',
    openingHours: '11:00 AM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Krishna+Dal+Bati+Restro+Udaipur'
  },
  {
    id: 'natraj-dining-hall',
    name: 'Natraj Dining Hall & Restaurant',
    hindiName: 'नटराज डाइनिंग हॉल',
    category: 'thali',
    priceCategory: 'under_250',
    avgCostPerPerson: 180,
    rating: 4.7,
    reviewCount: 9100,
    address: 'New Bapu Bazaar, Near Town Hall & Station Rd',
    distanceFromDreamyardKm: 2.2,
    nearestStop: 'City Center / Station',
    coordinates: { lat: 24.5805, lng: 73.6965 },
    famousDishes: ['Unlimited Gujarati & Rajasthani Thali', 'Kadhi', 'Khichdi', 'Gulab Jamun'],
    description: 'Legendary institution since 1970. Famous for warm Gujarati-Rajasthani unlimited thalis served by attentive staff. The ultimate budget feast in Udaipur.',
    openingHours: '11:30 AM - 03:30 PM & 06:30 PM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Natraj+Dining+Hall+Udaipur'
  },
  {
    id: 'jmb-sweets',
    name: 'Jagdish Mishtan Bhandar (JMB)',
    hindiName: 'जगदीश मिष्ठान भंडार (JMB)',
    category: 'street_food',
    priceCategory: 'under_100',
    avgCostPerPerson: 60,
    rating: 4.5,
    reviewCount: 4800,
    address: 'Outside Surajpole & Jagdish Chowk branch',
    distanceFromDreamyardKm: 0.45,
    nearestStop: 'Jagdish Temple',
    coordinates: { lat: 24.5796, lng: 73.6855 },
    famousDishes: ['Pyaz Ki Kachori', 'Mirchi Vada', 'Khamman Dhokla', 'Mawa Kachori'],
    description: 'Crisp, fiery Rajasthani breakfast staple. Perfect for a quick, authentic morning snack under ₹60 before hitting the palace.',
    openingHours: '07:00 AM - 09:30 PM',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagdish+Mishtan+Bhandar+Udaipur'
  },
  {
    id: 'jheels-ginger-coffee',
    name: 'Jheel\'s Ginger Coffee Bar & Bakery',
    hindiName: 'झील्स कैफे एवं बेकरी',
    category: 'chai_cafe',
    priceCategory: 'under_150',
    avgCostPerPerson: 130,
    rating: 4.6,
    reviewCount: 5200,
    address: '52-56 Gangaur Ghat Jheel Guest House, Old City',
    distanceFromDreamyardKm: 0.25,
    nearestStop: 'Gangaur Ghat (Day 1 Stop 4)',
    coordinates: { lat: 24.5801, lng: 73.6823 },
    famousDishes: ['Cold Coffee', 'Lemon Ginger Honey Tea', 'Wood-fired thin crust slice', 'Chocolate Brownie'],
    description: 'Charming rooftop and water-level seating right on the edge of Lake Pichola at Gangaur Ghat. Mesmerizing view with budget drinks.',
    openingHours: '08:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jheels+Ginger+Coffee+Bar+Udaipur'
  },
  {
    id: 'bombay-market-fateh-sagar',
    name: 'Bombay Market Street Food Plaza',
    hindiName: 'बॉम्बे मार्केट (फतेह सागर पाल)',
    category: 'street_food',
    priceCategory: 'under_100',
    avgCostPerPerson: 75,
    rating: 4.7,
    reviewCount: 7800,
    address: 'Fateh Sagar Paal Promenade, Rani Road',
    distanceFromDreamyardKm: 2.8,
    nearestStop: 'Fateh Sagar Lake (Day 2 Stop 3)',
    coordinates: { lat: 24.6035, lng: 73.6748 },
    famousDishes: ['Vipin Cold Coffee with Ice Cream', 'Hot Kulhad Coffee', 'Cheese Bread Pakoda', 'Mumbai Pav Bhaji'],
    description: 'The energetic youth hangout of Udaipur. Enjoy strong frothy cold coffee or spicy bread pakodas while watching the sunset over Fateh Sagar Lake.',
    openingHours: '10:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bombay+Market+Fateh+Sagar+Udaipur'
  },
  {
    id: 'sukhadia-pav-bhaji',
    name: 'Pandit Ji Pav Bhaji & Kulfi',
    hindiName: 'पंडित जी पाव भाजी (सुखाड़िया सर्कल)',
    category: 'street_food',
    priceCategory: 'under_100',
    avgCostPerPerson: 90,
    rating: 4.4,
    reviewCount: 3100,
    address: 'Sukhadia Circle Street Food Court, Panchwati',
    distanceFromDreamyardKm: 2.6,
    nearestStop: 'Sukhadia Circle (Day 2 Stop 4)',
    coordinates: { lat: 24.5982, lng: 73.6859 },
    famousDishes: ['Extra Butter Pav Bhaji', 'Pulao', 'Rabdi Kulfi Falooda'],
    description: 'Rich, sizzling tawa pav bhaji garnished with coriander and fresh lime, followed by traditional cooling kulfi beside the monumental marble fountain.',
    openingHours: '12:00 PM - 11:30 PM',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sukhadia+Circle+Pav+Bhaji+Udaipur'
  },
  {
    id: 'millets-of-mewar',
    name: 'Millets of Mewar (MOM)',
    hindiName: 'मिलेट्स ऑफ़ मेवाड़',
    category: 'budget_cafe',
    priceCategory: 'under_250',
    avgCostPerPerson: 200,
    rating: 4.5,
    reviewCount: 2200,
    address: 'Hanuman Ghat, Outside Chandpole',
    distanceFromDreamyardKm: 0.05,
    nearestStop: 'Dreamyard Udaipur (50m walk)',
    coordinates: { lat: 24.5792, lng: 73.6826 },
    famousDishes: ['Millet Thali (Bajra & Jowar Rotis)', 'Vegan Mewari Curry', 'Herbal Masala Chai'],
    description: 'First dedicated health and organic Rajasthani café, right beside Dreamyard at Hanuman Ghat. Delicious gluten-free bajra rotis and wholesome regional dishes.',
    openingHours: '08:30 AM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Millets+of+Mewar+Udaipur'
  }
];

export const UDAIPUR_MARKETS: MarketSpot[] = [
  {
    id: 'bada-bazaar-market',
    name: 'Bada Bazaar',
    hindiName: 'बड़ा बाज़ार',
    address: 'Old City, Bohrwadi, Udaipur',
    distanceFromDreamyardKm: 1.1,
    speciality: ['Embroidered Camel Leather Mojris (₹250-₹450)', 'Bandhani & Leheriya Dupattas (₹150-₹350)', 'Traditional Silver Jewellery', 'Rajasthani Turbans & Pagris'],
    bargainingTips: 'Merchants often quote initial prices 30-40% higher for tourists. Politely quote around 60% of their price and meet midway. Buying 2 or more items gives immediate negotiating leverage.',
    bestTimeToVisit: '04:30 PM - 07:30 PM when lanterns are lit and cool evening breeze sets in.',
    coordinates: { lat: 24.5838, lng: 73.6914 },
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bada+Bazaar+Udaipur'
  },
  {
    id: 'hathipole-market-spot',
    name: 'Hathipole Market',
    hindiName: 'हाथीपोल बाज़ार',
    address: 'Hathipole, Brahampuri, Udaipur',
    distanceFromDreamyardKm: 1.4,
    speciality: ['Authentic Pichwai Paintings on Cloth (₹300-₹1500)', 'Mewar Miniature Paintings', 'Carved Wooden Artifacts', 'Brass Idols & Door Knockers'],
    bargainingTips: 'Inspect whether the artwork is hand-painted with stone pigments or screen-printed. Genuine handmade pieces have fine brush stroke variations. Ask for a cardboard carrying tube.',
    bestTimeToVisit: '05:00 PM - 08:00 PM',
    coordinates: { lat: 24.5886, lng: 73.6896 },
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hathipole+Market+Udaipur'
  },
  {
    id: 'mochiwada-market',
    name: 'Mochiwada Bazaar (Leather Street)',
    hindiName: 'मोचीवाड़ा बाज़ार',
    address: 'Near Clock Tower, Old City, Udaipur',
    distanceFromDreamyardKm: 0.9,
    speciality: ['Handmade Leather Journals & Diaries (₹100-₹250)', 'Pure Leather Belts', 'Custom Footwear Fitting'],
    bargainingTips: 'Direct artisan workshops where cobblers hand-stitch footwear. Great value for genuine camel leather goods.',
    bestTimeToVisit: '11:00 AM - 07:00 PM',
    coordinates: { lat: 24.5845, lng: 73.6908 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mochiwada+Udaipur'
  }
];
