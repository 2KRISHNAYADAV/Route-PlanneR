import { Place } from '../types/travel';

export const UDAIPUR_PLACES: Record<string, Place> = {
  'dreamyard-hostel': {
    id: 'dreamyard-hostel',
    name: 'Dreamyard Udaipur',
    hindiName: 'ड्रीमयार्ड हॉस्टल',
    category: 'hotel',
    coordinates: { lat: 24.5794, lng: 73.6828 },
    address: '26, Hanuman Ghat, Outside Chandpole, Pichola, Udaipur, Rajasthan 313001',
    description: 'A vibrant, highly rated lake-view backpacker hostel and guesthouse nestled right on the western bank of Lake Pichola at Hanuman Ghat. Offers rooftop panoramic views of City Palace and Jag Mandir, budget solo dorms, and a peaceful community vibe.',
    historicalSignificance: 'Located in the historic Hanuman Ghat neighborhood, an ancient water access point connected by pedestrian footbridges across the narrow neck of Lake Pichola to the Old City.',
    estimatedVisitDurationMinutes: 0,
    entryFee: {
      amount: 0,
      currency: 'INR',
      isVerified: true,
      notes: 'Included in personal accommodation budget (~₹750/night for budget solo backpacker dorm/room)'
    },
    openingHours: {
      open: '00:00',
      close: '23:59',
      isVerified: true,
      notes: '24-hour reception; quiet hours after 10:30 PM'
    },
    photographyTips: [
      'Spectacular sunrise & golden hour shots of City Palace and Lake Pichola right from the hostel rooftop terrace.',
      'Night-time long exposures of the illuminated City Palace reflecting across the lake water.'
    ],
    safetyAdvice: [
      'Alleys around Hanuman Ghat are cobblestoned and narrow; watch for motorbikes and cows.',
      'Keep room keycard safe and lock your valuables in the provided backpacker lockers.'
    ],
    nearbyFood: [
      'Millets of Mewar (Hanuman Ghat - 50m)',
      'Jheel\'s Ginger Coffee Bar (across footbridge at Gangaur Ghat - 180m)',
      'Rainbow Restaurant (lakeside dining - 120m)'
    ],
    transportOptions: [
      'Walking is the best mode for exploring Old City and ghats from here.',
      'Auto-rickshaw stand available at Chandpole gate (150m walk across footbridge).'
    ],
    officialWebsite: 'https://www.dreamyard.in',
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    tags: ['Hostel', 'Base Camp', 'Lake Pichola', 'Rooftop', 'Hanuman Ghat'],
    lastCheckedDate: '2026-11-20'
  },

  'city-palace': {
    id: 'city-palace',
    name: 'City Palace Complex',
    hindiName: 'सिटी पैलेस उदयपुर',
    category: 'heritage',
    coordinates: { lat: 24.5764, lng: 73.6835 },
    address: 'Old City, Udaipur, Rajasthan 313001',
    description: 'The monumental crown jewel of Mewar architecture, built over nearly 400 years on the eastern banks of Lake Pichola. A colossal fusion of Rajasthani and Mughal architectural styles featuring Mor Chowk (peacock courtyard), Sheesh Mahal, Zenana Mahal, and the City Palace Museum.',
    historicalSignificance: 'Founded in 1559 by Maharana Udai Singh II when he shifted the Mewar capital from Chittorgarh to Udaipur. It remains the historic seat of the Mewar dynasty.',
    estimatedVisitDurationMinutes: 140, // 2 to 2.5 hours
    entryFee: {
      amount: 400,
      currency: 'INR',
      isVerified: true,
      notes: '₹400 for Museum & Palace adult entry (subject to minor seasonal ASI/trust updates; audio guides and camera passes extra).'
    },
    openingHours: {
      open: '09:00 AM',
      close: '09:00 PM',
      lastEntry: '05:30 PM (Museum galleries close by 5:30 PM)',
      isVerified: true,
      notes: 'Palace premises open till 9 PM, but the main museum corridors cease ticket entries after 5:30 PM.'
    },
    photographyTips: [
      'Mor Chowk (Peacock Courtyard) features three exquisite glass-mosaic peacocks in vivid blue, green, and gold.',
      'Balcony viewpoints (Manak Mahal & Amar Vilas) frame sweeping vistas over Lake Pichola, Taj Lake Palace, and Jag Mandir.',
      'Arrive right at 9:00 AM opening to capture courtyards before large tourist tour buses arrive.'
    ],
    safetyAdvice: [
      'Floors are polished stone and staircases are steep and narrow with uneven step heights; wear supportive walking shoes.',
      'Watch out for freelance unofficial "guides" near Badi Pol; rely only on authorized audio guides or verified palace guides.'
    ],
    nearbyFood: [
      'Jagat Niwas Palace Restaurant (Lal Ghat - 300m)',
      'Krishna Dal Bati (Jagdish Chowk branch - 250m)',
      'Palki Khana (inside palace courtyard - premium café)'
    ],
    transportOptions: [
      'Pedestrian walk from Dreamyard: 800m via Chandpole footbridge & Jagdish Chowk (10-12 mins).',
      'Battery-operated golf carts operate inside the compound for seniors.'
    ],
    officialWebsite: 'https://www.citypalacemuseum.org',
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    tags: ['Heritage', 'Museum', 'Mewar Royalty', 'Architecture', 'Top Attraction'],
    lastCheckedDate: '2026-11-20'
  },

  'jagdish-temple': {
    id: 'jagdish-temple',
    name: 'Jagdish Temple',
    hindiName: 'जगदीश मंदिर',
    category: 'temple',
    coordinates: { lat: 24.5795, lng: 73.6853 },
    address: 'RJ SH 50, Old City, Silawatwari, Udaipur, Rajasthan 313001',
    description: 'A grand Indo-Aryan three-story Hindu temple built on an elevated plinth right at the nexus of the Old City. Features towering carved pillars, painted ceilings, lush marble spires, and a renowned black stone idol of Lord Vishnu (as Jagannath/Jagdish).',
    historicalSignificance: 'Commissioned by Maharana Jagat Singh I in 1651 AD. The steep flight of 32 marble stairs is flanked by monumental stone elephants and sculpted guardian lions.',
    estimatedVisitDurationMinutes: 30,
    entryFee: {
      amount: 0,
      currency: 'INR',
      isVerified: true,
      notes: 'Completely free entry. Footwear custody stall charges a nominal ₹10 voluntary token.'
    },
    openingHours: {
      open: '05:00 AM',
      close: '10:00 PM',
      isVerified: true,
      notes: 'Morning Darshan & Aarti: 05:00 AM - 01:00 PM; Reopens 04:15 PM - 10:00 PM. Best experienced at 11:30 AM before afternoon quiet.'
    },
    photographyTips: [
      'Detailed telephoto shots of the exterior carved stone friezes depicting horsemen, dancers, and celestial musicians.',
      'Photography is strictly prohibited inside the inner sanctum (Garbhagriha); respectful photography allowed in the outer courtyard.'
    ],
    safetyAdvice: [
      'The 32 steep marble steps can become slick under dusty feet or light drizzle; use handrails.',
      'Dress modestly covering shoulders and knees out of respect for active worshipers.'
    ],
    nearbyFood: [
      'Jagdish Mishtan Bhandar (JMB) right at temple base (legendary Pyaz Kachori & Poha)',
      'Krishna Dal Bati Restro (150m along Jagdish Chowk)'
    ],
    transportOptions: [
      '250m walking distance north from City Palace main gate.',
      '500m walk from Dreamyard Hostel via Chandpole.'
    ],
    images: [
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    tags: ['Temple', 'Heritage', 'Spiritual', 'Indo-Aryan', 'Free Entry'],
    lastCheckedDate: '2026-11-20'
  },

  'rajasthani-lunch-day1': {
    id: 'rajasthani-lunch-day1',
    name: 'Local Rajasthani Lunch: Krishna Dal Bati',
    hindiName: 'कृष्णा दाल बाटी एवं भोजनालय',
    category: 'food',
    coordinates: { lat: 24.5802, lng: 73.6848 },
    address: 'Near Jagdish Temple / Jalsham Chowk, Old City, Udaipur, Rajasthan 313001',
    description: 'An authentic, cherished no-frills culinary hotspot famous for pure desi-ghee Dal Baati Churma, spicy Panchmel dal, gatte ki sabzi, kadhi, and warm baatis dipped in aroma. Highly popular among both locals and savvy solo travelers for value and rich taste.',
    historicalSignificance: 'Preserving centuries-old Mewari royal recipes where sun-baked baatis were traditional battlefield rations of Rajput warriors, perfected with ghee and churma desserts.',
    estimatedVisitDurationMinutes: 50,
    entryFee: {
      amount: 180,
      currency: 'INR',
      isVerified: true,
      notes: 'Full authentic Dal Baati Churma Thali typically ₹160 - ₹220 with unlimited dal and chutney refills.'
    },
    openingHours: {
      open: '11:00 AM',
      close: '10:30 PM',
      isVerified: true,
      notes: 'Peak lunch rush is between 12:30 PM - 02:00 PM; arriving around 12:00 PM guarantees immediate seating.'
    },
    photographyTips: [
      'Flat-lay shot of the traditional bronze/stainless thali with crushed golden baatis bathed in piping hot ghee.',
      'Capturing the steam rising from the clay pots of slow-cooked panchmel dal.'
    ],
    safetyAdvice: [
      'Dal Baati is very rich and ghee-heavy; pace yourself and stay hydrated with plain warm water or fresh buttermilk (chaas).',
      'Ask for mild spice if you are sensitive to Rajasthani red chili paste (lasun chatni).'
    ],
    nearbyFood: [
      'Millets of Mewar (Hanuman Ghat - healthy alternative)',
      'Natraj Dining Hall (Station road - alternative unlimited Gujarati/Rajasthani thali)'
    ],
    transportOptions: [
      'Short 150m walk from Jagdish Temple.',
      '300m walk from Gangaur Ghat.'
    ],
    images: [
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.5,
    tags: ['Food', 'Dal Baati Churma', 'Budget Meal', 'Rajasthani Thali', 'Must-Eat'],
    lastCheckedDate: '2026-11-20'
  },

  'gangaur-ghat': {
    id: 'gangaur-ghat',
    name: 'Gangaur Ghat & Bagore Ki Haveli',
    hindiName: 'गणगौर घाट एवं बागोर की हवेली',
    category: 'heritage',
    coordinates: { lat: 24.5797, lng: 73.6822 },
    address: 'Old City, Udaipur, Rajasthan 313001',
    description: 'The cultural heartbeat of Udaipur on the waterfront of Lake Pichola. Iconic wide stone steps where women celebrate the Gangaur festival, pigeons gather at the lakeside, and artists sketch. Bagore Ki Haveli overlooks the ghat with its 138 royal rooms and museum.',
    historicalSignificance: 'Built in the 18th century by Amar Chand Badwa, Prime Minister of Mewar. Historic gathering site for royal celebrations and religious immersion processions.',
    estimatedVisitDurationMinutes: 45,
    entryFee: {
      amount: 0,
      currency: 'INR',
      isVerified: true,
      notes: 'Gangaur Ghat open public steps are 100% free. Bagore Ki Haveli daylight museum entry is ₹100 (optional; cultural dance show is in the evening at 7 PM for ₹150).'
    },
    openingHours: {
      open: '06:00 AM',
      close: '10:00 PM',
      isVerified: true,
      notes: 'Ghat steps open 24/7; peaceful early afternoon ambiance before sunset crowds.'
    },
    photographyTips: [
      'Arched Rajasthani jharokhas framing Taj Lake Palace across the blue water ripples.',
      'Wide-angle street photos of the ghat steps, flying pigeons, and heritage carved archway.'
    ],
    safetyAdvice: [
      'Watch your step on algae-covered lower water steps, especially near the water line.',
      'Do not jump into or swim in the lake.'
    ],
    nearbyFood: [
      'Jheel\'s Ginger Coffee Bar & Bakery (adjacent on ghat edge - great coffee and cold tea)',
      'Ozen Café (rooftop view over the ghat)'
    ],
    transportOptions: [
      'Walk across the footbridge to/from Hanuman Ghat in under 3 minutes (180m).',
      'Walking connection to Jagdish Chowk (220m).'
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    tags: ['Lakeside', 'Ghat', 'Photography', 'Heritage', 'Free Viewpoint'],
    lastCheckedDate: '2026-11-20'
  },

  'pichola-boat-ride': {
    id: 'pichola-boat-ride',
    name: 'Lake Pichola Boat Ride',
    hindiName: 'पिछोला झील नाव सफारी',
    category: 'lake',
    coordinates: { lat: 24.5785, lng: 73.6805 },
    address: 'Municipal Boat Jetty / Rameshwar Ghat (also City Palace Bansi Ghat), Udaipur, Rajasthan 313001',
    description: 'An essential Udaipur experience gliding across the shimmering waters of artificial freshwater Lake Pichola. Offers unparalleled 360-degree views of the white marble Taj Lake Palace, Jag Mandir island palace, City Palace facade, and the Aravalli mountain backdrop.',
    historicalSignificance: 'Created in 1362 AD by a Banjara tribesman named Pichhu Banjara during the reign of Maharana Lakha to transport grain carts across floodplains, later enlarged by Maharana Udai Singh II.',
    estimatedVisitDurationMinutes: 60,
    entryFee: {
      amount: 400,
      currency: 'INR',
      isVerified: true,
      notes: 'Daytime shared boat tickets range ₹300-₹450 at Rameshwar Ghat / Municipal Jetty (Official Municipal counter is budget-friendly; City Palace Bansi Ghat luxury jetty charges ₹500-₹800). Afternoon daylight rate fits personal ₹400 budget.'
    },
    openingHours: {
      open: '10:00 AM',
      close: '06:00 PM',
      lastEntry: '05:30 PM (Sunset boats sell out fast)',
      isVerified: true,
      notes: 'Boats depart continuously every 20-30 minutes. 2:00 PM slot provides brilliant direct daylight for vibrant blue lake photos without peak sunset wait queues.'
    },
    photographyTips: [
      'Sit on the starboard (right) side on departure for the most unobstructed angles of Taj Lake Palace.',
      'Use a polarizing filter or higher shutter speed (1/500s) to handle intense water reflections.',
      'Jag Mandir garden stop allows iconic frames of the marble elephant guardians facing the lake.'
    ],
    safetyAdvice: [
      'Life jackets are strictly mandatory by Rajasthan maritime safety regulations; keep fastened throughout the ride.',
      'Secure phone and camera straps before boarding; avoid leaning too far over the gunwale.'
    ],
    nearbyFood: [
      'Ambrai Restaurant (near Hanuman Ghat jetty edge)',
      'Lake Shore Restaurant (budget drinks & snacks)'
    ],
    transportOptions: [
      'Walking 400m south from Gangaur Ghat along the lake perimeter.',
      'Can also board from Hanuman Ghat municipal jetty depending on daily water level and boat allocation.'
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    tags: ['Lake', 'Boat Safari', 'Taj Lake Palace', 'Jag Mandir', 'Iconic View'],
    lastCheckedDate: '2026-11-20'
  },

  'bada-bazaar': {
    id: 'bada-bazaar',
    name: 'Bada Bazaar & Clock Tower',
    hindiName: 'बड़ा बाज़ार एवं घंटाघर',
    category: 'market',
    coordinates: { lat: 24.5838, lng: 73.6914 },
    address: 'Bada Bazaar Rd, Old City, Bohrwadi, Udaipur, Rajasthan 313001',
    description: 'The ancient commercial artery of Udaipur. A bustling, sensory-rich marketplace filled with traditional silver jewellery, camel leather bags and mojris (embroidered slip-on shoes), bandhani tie-dye sarees, and colourful Rajasthani fabrics.',
    historicalSignificance: 'Formed as the primary merchant quarter under the Maharanas, where craftsmen supplied silver, turbans, and fabrics directly to royal households.',
    estimatedVisitDurationMinutes: 50,
    entryFee: {
      amount: 0,
      currency: 'INR',
      isVerified: true,
      notes: 'Public street market, free entry.'
    },
    openingHours: {
      open: '10:30 AM',
      close: '08:30 PM',
      isVerified: true,
      notes: 'Best visited late afternoon around 4:30 PM when all merchant shutters are fully open and lights glow.'
    },
    photographyTips: [
      'Vibrant candid shots of dyed textiles hanging from wooden storefronts.',
      'Macro shots of glittering silver payals (anklets) and handmade leather juttis.'
    ],
    safetyAdvice: [
      'Old City alleys are crowded with two-wheelers honking through tight lanes; walk on the side.',
      'Bargaining tip: Start by offering 60% of the quoted opening price for souvenirs and leather goods; remain polite and smiling.'
    ],
    nearbyFood: [
      'Sukhadia Sweets branch (Ghevar & Mawa Kachori)',
      'Lala Ji Lassi (thick creamy malai lassi in earthen kulhad - ₹40)'
    ],
    transportOptions: [
      'Walking 900m northeast from Dreamyard via Delhi Gate road or Clock Tower.',
      'Auto-rickshaw available at Mochiwada intersection.'
    ],
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.4,
    tags: ['Market', 'Shopping', 'Mojris', 'Bandhani', 'Silver', 'Bargaining'],
    lastCheckedDate: '2026-11-20'
  },

  'hathipole-market': {
    id: 'hathipole-market',
    name: 'Hathipole Market',
    hindiName: 'हाथीपोल बाज़ार',
    category: 'market',
    coordinates: { lat: 24.5886, lng: 73.6896 },
    address: 'Hathipole, Brahampuri, Udaipur, Rajasthan 313001',
    description: 'Renowned as the premier artisanal center in Rajasthan for traditional Pichwai cloth paintings, Kishangarh miniatures, brass handicrafts, and hand-embroidered textiles. Much less chaotic than Delhi Gate and highly favored by connoisseurs of Mewari folk art.',
    historicalSignificance: 'Named after the historic Elephant Gate ("Hathi Pol") through which royal royal elephant processions used to enter the fortified city from the north.',
    estimatedVisitDurationMinutes: 60,
    entryFee: {
      amount: 0,
      currency: 'INR',
      isVerified: true,
      notes: 'Free public market access.'
    },
    openingHours: {
      open: '10:00 AM',
      close: '08:30 PM',
      isVerified: true,
      notes: 'Evenings between 5:00 PM and 7:00 PM are ideal for shopping.'
    },
    photographyTips: [
      'Artisans meticulously painting delicate lotus flowers and cows on raw cloth using natural stone pigments.',
      'The bustling crossroads and traditional carved heritage facade of the historic Hathi Pol entrance.'
    ],
    safetyAdvice: [
      'Verify authenticity: Genuine stone-color Pichwai has subtle earth tones; mass-printed synthetic copies look glossy under bright lights.',
      'Ask for packaging in a hard protective cardboard cylinder if buying paper or cloth miniatures to fit your backpack.'
    ],
    nearbyFood: [
      'Bhole Mishtan Bhandar (Rabdi and hot Jalebi - ₹40-₹60)',
      'Local Chai tapri near Hathi Pol junction (₹10)'
    ],
    transportOptions: [
      'Walking 600m north from Bada Bazaar.',
      'Auto-rickshaw back to Chandpole/Dreamyard is approx ₹70-₹100.'
    ],
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    tags: ['Market', 'Pichwai Art', 'Miniature Paintings', 'Handicrafts', 'Artisanal'],
    lastCheckedDate: '2026-11-20'
  },

  'dinner-chandpole': {
    id: 'dinner-chandpole',
    name: 'Evening Dinner & Chandpole Return',
    hindiName: 'चांदपोल रात्रि भोजन एवं ड्रीमयार्ड वापसी',
    category: 'food',
    coordinates: { lat: 24.5808, lng: 73.6830 },
    address: 'Outside Chandpole Gate / Hanuman Ghat, Udaipur, Rajasthan 313001',
    description: 'A relaxed, budget-friendly dinner in the charming Chandpole alleyways right next to Dreamyard Hostel. Enjoy fresh hot rotis, Sev Tamatar ki sabzi, aromatic Dal fry, jeera rice, or an authentic thali while soaking in the gentle night breeze of Lake Pichola.',
    historicalSignificance: 'Chandpole is the western "Moon Gate" of historic Udaipur, offering moonlit reflections on the lake waters.',
    estimatedVisitDurationMinutes: 60,
    entryFee: {
      amount: 150,
      currency: 'INR',
      isVerified: true,
      notes: 'Hearty budget dinner typically ₹120 - ₹180 per person at local dhabas & budget rooftop cafes.'
    },
    openingHours: {
      open: '07:00 PM',
      close: '11:00 PM',
      isVerified: true,
      notes: 'Dinner served hot from 7:00 PM onwards.'
    },
    photographyTips: [
      'Night-time shots across the illuminated footbridge connecting Chandpole and Hanuman Ghat.',
      'Golden glow of lanterns hanging from quaint haveli doorways.'
    ],
    safetyAdvice: [
      'Alleys are well lit until 10:30 PM, but keep your phone flashlight handy for darker cobblestone corners.',
      'Rest up early to prepare for the 6:00 AM Bahubali Hills sunrise departure tomorrow!'
    ],
    nearbyFood: [
      'Yummy Lummy Café (budget pastas & rotis)',
      'Millets of Mewar (healthy thalis & multi-grain parathas)',
      'Dreamyard rooftop chillout zone'
    ],
    transportOptions: [
      'Just 100-150m walking distance to Dreamyard Hostel.'
    ],
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.5,
    tags: ['Dinner', 'Chandpole', 'Local Food', 'Budget', 'Rooftop'],
    lastCheckedDate: '2026-11-20'
  },

  // DAY 2 PLACES
  'bahubali-hills': {
    id: 'bahubali-hills',
    name: 'Bahubali Hills (Badi Lake Viewpoint)',
    hindiName: 'बाहुबली हिल्स (बड़ी झील व्यू पॉइंट)',
    category: 'viewpoint',
    coordinates: { lat: 24.6225, lng: 73.6186 },
    address: 'Nathawato Ka Guda, Badi Lake, Udaipur, Rajasthan 313011',
    description: 'An awe-inspiring hill ridge overlooking emerald-green Badi Lake, famously nicknamed Bahubali Hills for its dramatic curved peninsula resembling cinematic kingdoms. A scenic 15-20 minute short hike up a rugged trail leads to the peak ridge with mesmerizing 360-degree views of the Aravalli ranges.',
    historicalSignificance: 'Badi Lake (also called Jiyan Sagar) was built between 1652-1680 AD by Maharana Raj Singh I to relieve famine. The hill ridge remained a hidden pastoral grazing hill until photography enthusiasts popularized its breathtaking peninsula.',
    estimatedVisitDurationMinutes: 90,
    entryFee: {
      amount: 10,
      currency: 'INR',
      isVerified: true,
      notes: 'A nominal ₹10 forest / panchayat maintenance fee is collected at the parking trailhead. Two-wheeler parking ₹10, auto/taxi ₹20-30.'
    },
    openingHours: {
      open: '06:00 AM',
      close: '06:30 PM',
      lastEntry: '05:30 PM',
      isVerified: true,
      notes: 'Open early for sunrise. You MUST leave Dreamyard by 6:00 AM to catch the magical 6:40-7:00 AM dawn light!'
    },
    photographyTips: [
      'The classic panoramic viewpoint captures the rocky peninsula jutting into the circular teal lake with mountain layers receding into morning mist.',
      'Sunrise casts a warm orange glow on the eastern ridge slopes, reflecting in still lake water.'
    ],
    safetyAdvice: [
      'TRAIL PRECAUTIONS: The hiking trail is unpaved, dusty, and has loose gravel and shale rocks; wearing grip sneakers is essential (do not hike in flip-flops or smooth loafers).',
      'WILDLIFE & MONKEYS: Avoid carrying loose food in hands or polythene bags; monkeys inhabit the base temple area.',
      'TRANSPORT CAUTION: Pre-book a round-trip auto-rickshaw or taxi from Udaipur (approx ₹400-₹500 roundtrip with waiting) or rent a scooter, as return autos are rarely idling at Badi Lake early in the morning.'
    ],
    nearbyFood: [
      'Chai & Maggi stalls at the base parking area (hot ginger tea ₹15, egg/veg Maggi ₹40-₹60)',
      'Badi Lake Paal tea stalls'
    ],
    transportOptions: [
      'Distance: ~13 km from Dreamyard via Rani Road and Badi Main Road (25-30 mins by auto or taxi).',
      'Hire an auto from Chandpole the previous evening or book via local taxi/scooter rental.'
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    tags: ['Viewpoint', 'Sunrise Hike', 'Badi Lake', 'Aravalli Hills', 'Nature', 'Must-Visit'],
    lastCheckedDate: '2026-11-20'
  },

  'saheliyon-ki-bari': {
    id: 'saheliyon-ki-bari',
    name: 'Saheliyon Ki Bari',
    hindiName: 'सहेलियों की बाड़ी',
    category: 'garden',
    coordinates: { lat: 24.6015, lng: 73.6852 },
    address: 'Saheli Marg, New Fatehpura, Panchwati, Udaipur, Rajasthan 313001',
    description: 'The historic "Garden of the Maidens", a serene 18th-century landscaped botanical retreat featuring lush manicured lawns, marble pavilions, carved elephant statues spouting natural gravity-fed water fountains, bird-shaped fountains, and serene lotus pools.',
    historicalSignificance: 'Designed by Maharana Sangram Singh II (1710-1734) as a tranquil royal retreat for a princess and her 48 royal female attendants who accompanied her as part of the wedding dowry.',
    estimatedVisitDurationMinutes: 60,
    entryFee: {
      amount: 20,
      currency: 'INR',
      isVerified: true,
      notes: '₹20 for Indian nationals. Very budget-friendly; small on-site royal museum fee is ₹10.'
    },
    openingHours: {
      open: '09:00 AM',
      close: '07:00 PM',
      isVerified: true,
      notes: 'Arriving at 9:00 AM straight after Bahubali Hills provides calm surroundings before school tours and midday heat.'
    },
    photographyTips: [
      'The central lotus pool featuring sculpted black marble elephants spraying mist towards the ornate pavilion.',
      'Rose garden arches and bougainvillea canopies reflecting in natural water channels.'
    ],
    safetyAdvice: [
      'The walking paths around fountains can have overspray and get damp; walk carefully.',
      'Do not pluck flowers or throw trash into the historical lotus pools.'
    ],
    nearbyFood: [
      'Sukhadia Circle street food stands (800m south)',
      'Garden Restaurant & Chai kiosks opposite the exit gate'
    ],
    transportOptions: [
      'Distance from Bahubali Hills: ~11.5 km road trip (approx 20 mins by auto/cab).',
      'Auto-rickshaw stand stationed right outside the exit gate.'
    ],
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    tags: ['Garden', 'Fountains', 'Heritage', 'Lotus Pool', 'Peaceful', 'Budget-Friendly'],
    lastCheckedDate: '2026-11-20'
  },

  'fateh-sagar-lake': {
    id: 'fateh-sagar-lake',
    name: 'Fateh Sagar Lake & Paal',
    hindiName: 'फतेह सागर झील एवं पाल',
    category: 'lake',
    coordinates: { lat: 24.6033, lng: 73.6745 },
    address: 'Fateh Sagar Paal / Rani Rd, Udaipur, Rajasthan 313001',
    description: 'A magnificent pear-shaped artificial lake flanked by green hills on three sides. Known for its breezy paved walking promenade (Fateh Sagar Paal), speed boats, tranquil Nehru Park island garden in the center, and the famous Bombay Market street food stretch.',
    historicalSignificance: 'Constructed by Maharana Jai Singh in 1687 and later reconstructed and expanded by Maharana Fateh Singh in 1889 following heavy flood dam reconstruction.',
    estimatedVisitDurationMinutes: 75,
    entryFee: {
      amount: 0,
      currency: 'INR',
      isVerified: true,
      notes: 'Lakeside promenade walking is 100% free. Shared boat ride to Nehru Park island is approx ₹150-₹200 (optional).'
    },
    openingHours: {
      open: '06:00 AM',
      close: '10:00 PM',
      isVerified: true,
      notes: 'Paal is open all day; boat rides operate 09:00 AM to 06:00 PM.'
    },
    photographyTips: [
      'Panoramic perspective from the Paal overlooking the Udaipur Solar Observatory island.',
      'Reflections of the sun-dappled Aravalli hills in the blue lake waters.'
    ],
    safetyAdvice: [
      'Keep away from stone embankment rims where railings are low.',
      'Be cautious of bicycles and pedal-rickshaws sharing the lakeside walking track.'
    ],
    nearbyFood: [
      'Bombay Market Street Food Plaza right on the Paal (legendary hot coffee / cold coffee with ice cream ₹50-₹70, bread pakoda, chaat)',
      'Vipin Cold Coffee (Udaipur local favorite stall)'
    ],
    transportOptions: [
      '1.5 km scenic stroll or 5-min auto ride from Saheliyon Ki Bari.',
      'Auto-rickshaws readily available at both ends of the Paal.'
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    tags: ['Lake', 'Promenade', 'Fateh Sagar Paal', 'Street Food', 'Walking', 'Iconic'],
    lastCheckedDate: '2026-11-20'
  },

  'lunch-sukhadia-circle': {
    id: 'lunch-sukhadia-circle',
    name: 'Lunch & Afternoon Rest (Sukhadia Circle)',
    hindiName: 'सुखाड़िया सर्कल दोपहर भोजन एवं विश्राम',
    category: 'food',
    coordinates: { lat: 24.5980, lng: 73.6858 },
    address: 'Sukhadia Circle, Panchwati, Udaipur, Rajasthan 313001',
    description: 'A charming landscaped roundabout anchored by a monumental 21-foot-high, three-tiered marble fountain and duck pond. Surrounded by beloved street-food stalls, budget south-Indian & north-Indian eateries, and juice centers. Perfect mid-day stop to refuel and recharge before the uphill Sajjangarh sunset journey.',
    historicalSignificance: 'Opened in 1970 to honor Mohan Lal Sukhadia, former Chief Minister of Rajasthan, representing modern Udaipur\'s civic heritage.',
    estimatedVisitDurationMinutes: 60,
    entryFee: {
      amount: 140,
      currency: 'INR',
      isVerified: true,
      notes: 'Lunch at nearby budget thali centers or Pav Bhaji / Dosa stalls costs approx ₹100 - ₹160.'
    },
    openingHours: {
      open: '11:00 AM',
      close: '11:30 PM',
      isVerified: true,
      notes: 'Eateries open throughout afternoon; shaded trees around the fountain offer cool respite.'
    },
    photographyTips: [
      'The multi-tier white marble fountain spraying water into the reflecting pool with paddle boats.',
      'Vibrant street food preparation (roasting spiced bhutta / tossing pav bhaji).'
    ],
    safetyAdvice: [
      'Pick food vendors with clean potable water filters and high foot traffic for maximum freshness.',
      'Take 30-40 minutes of quiet rest under shady trees or at a café to stay energetic for the afternoon hike/visit.'
    ],
    nearbyFood: [
      'Pandit Pav Bhaji (famous Udaipur butter pav bhaji - ₹80)',
      'Agrawal Pure Veg & Thali Restaurant (complete thali ₹140)',
      'Baskin Robbins or local Kulfi Falooda stall (₹50)'
    ],
    transportOptions: [
      '1.2 km from Fateh Sagar Paal (5 min auto ride or 15 min walk).',
      'Central transit hub with easy autos to Sajjangarh base.'
    ],
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.5,
    tags: ['Lunch', 'Sukhadia Circle', 'Street Food', 'Pav Bhaji', 'Rest Stop'],
    lastCheckedDate: '2026-11-20'
  },

  'sajjangarh-monsoon-palace': {
    id: 'sajjangarh-monsoon-palace',
    name: 'Sajjangarh (Monsoon Palace)',
    hindiName: 'सज्जनगढ़ मानसून पैलेस',
    category: 'heritage',
    coordinates: { lat: 24.5937, lng: 73.6367 },
    address: 'Bansdara Peak, Sajjangarh Wildlife Sanctuary, Udaipur, Rajasthan 313011',
    description: 'A dramatic 19th-century hilltop palace crowning the high Bansdara peak of the Aravalli range, 944 meters (3,100 feet) above sea level. Originally designed as an astronomical observatory and monsoon retreat, it delivers the most legendary sunset panorama in all of Udaipur, looking down upon the city lakes, palaces, and endless mountain horizons.',
    historicalSignificance: 'Built in 1884 by Maharana Sajjan Singh to track monsoon cloud trajectories over Mewar. The palace is constructed of white marble and overlooks the surrounding Sajjangarh Wildlife Sanctuary.',
    estimatedVisitDurationMinutes: 120,
    entryFee: {
      amount: 110,
      currency: 'INR',
      isVerified: true,
      notes: 'Palace Entry fee: ₹110 for Indians + ₹30 Sanctuary forest permit. Uphill shared government electric vehicle/shuttle van from base gate costs ₹100-₹150 round-trip (or hire taxi/auto that has forest permit).'
    },
    openingHours: {
      open: '09:00 AM',
      close: '06:00 PM',
      lastEntry: '05:00 PM - 05:30 PM (CRITICAL: Sanctuary entrance gate at base strictly halts ticketing after 5:30 PM!)',
      isVerified: true,
      notes: 'DO NOT arrive late: to secure shuttle van and entry before gate cut-off, plan arrival at base gate between 3:30 PM - 4:00 PM.'
    },
    photographyTips: [
      'The western terrace looks directly towards the sunset behind the jagged Aravalli ridges; bring a wide-angle lens.',
      'Look eastwards to capture the distant City Palace, Pichola, and Fateh Sagar bathed in amber dusk light.'
    ],
    safetyAdvice: [
      'TIMING WARNING: Sunset in late November in Udaipur occurs around 5:45 PM. Forest sanctuary gates strictly enforce departure after sunset; do not linger past guards\' whistle calls.',
      'VEHICLE REQUIREMENT: The 4 km road from base gate to hilltop has steep hairpin curves and switchbacks. Ordinary bicycles or heavy luggage autos are not allowed; use the authorized sanctuary shuttle vans or approved taxis.',
      'WILDLIFE: Sanctuary is home to sambar deer, nilgai, and leopards; do not wander off marked paved palace terraces into the forest brush.'
    ],
    nearbyFood: [
      'Café and snack counter at the hilltop palace courtyard (hot tea ₹20, chips, bottled water)',
      'Sajjangarh base gate dhabas'
    ],
    transportOptions: [
      'Road from Sukhadia Circle/Old City: approx 8.5 km to base gate (20 mins by auto).',
      'From base gate, take the official forest electric van (10 mins winding uphill).'
    ],
    officialWebsite: 'https://rajasthantourism.gov.in',
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    tags: ['Monsoon Palace', 'Sunset View', 'Hilltop', 'Wildlife Sanctuary', 'Must-Visit'],
    lastCheckedDate: '2026-11-20'
  },

  'udaipur-station': {
    id: 'udaipur-station',
    name: 'Udaipur City Railway Station',
    hindiName: 'उदयपुर सिटी रेलवे स्टेशन',
    category: 'heritage',
    coordinates: { lat: 24.5739, lng: 73.7008 },
    address: 'Station Rd, Jawahar Nagar, Udaipur, Rajasthan 313001',
    description: 'The primary rail terminus connecting Udaipur to Vadodara, Ahmedabad, Delhi, and Mumbai. Equipped with waiting rooms, cloaking facilities, IRCTC food courts, and prepaid auto-rickshaw booths.',
    historicalSignificance: 'The gateway rail terminal for the royal city of Mewar.',
    estimatedVisitDurationMinutes: 30,
    entryFee: {
      amount: 0,
      currency: 'INR',
      isVerified: true,
      notes: 'Included in train transportation ticket budget (Vadodara Express / Superfast)'
    },
    openingHours: {
      open: '00:00',
      close: '23:59',
      isVerified: true,
      notes: 'Open 24/7. Trains to Vadodara / Gujarat depart in late evening (e.g., 09:30 PM - 11:00 PM overnight services).'
    },
    photographyTips: [
      'Heritage architectural station facade illuminated at night.'
    ],
    safetyAdvice: [
      'Arrive 45-60 minutes before scheduled train departure.',
      'Prepaid auto booth right outside platform 1 prevents overcharging.'
    ],
    nearbyFood: [
      'Natraj Dining Hall (500m west - outstanding budget thali)',
      'IRCTC Jan Aahaar at platform 1 (budget meal packets)'
    ],
    transportOptions: [
      '3.2 km road distance from Dreamyard Hostel (12-15 mins by auto-rickshaw, ₹100-₹120 standard fare).'
    ],
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.3,
    tags: ['Transit', 'Railway Station', 'Vadodara Return', 'Departure'],
    lastCheckedDate: '2026-11-20'
  }
};
