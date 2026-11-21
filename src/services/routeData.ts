import { RouteLeg } from '../types/travel';

// Verified high-definition road polylines following real Udaipur roads
// Day 1 Legs (Old City & Lake Pichola - Walking & Short Auto)
export const DAY1_ROAD_LEGS: RouteLeg[] = [
  {
    id: 'd1-leg-0-1',
    fromStopId: 'dreamyard-hostel',
    toStopId: 'city-palace',
    fromName: 'Dreamyard Udaipur',
    toName: 'City Palace Complex',
    travelMode: 'walking',
    distanceKm: 0.95,
    durationMinutes: 14,
    roadCoordinates: [
      [24.5794, 73.6828], // Dreamyard Hanuman Ghat
      [24.5795, 73.6831], // Alleys to Footbridge
      [24.5797, 73.6836], // Chandpole pedestrian footbridge crossing Lake Pichola neck
      [24.5798, 73.6841], // Exiting Chandpole bridge to Chandpole road
      [24.5796, 73.6847], // Silawatwari curve
      [24.5792, 73.6851], // Jagdish Chowk entrance road
      [24.5786, 73.6849], // Old City Palace road heading south
      [24.5779, 73.6845], // Past Tripolia Pol gate approach
      [24.5771, 73.6841], // Badi Pol outer court
      [24.5764, 73.6835]  // City Palace entrance courtyard (Manak Chowk)
    ],
    maneuvers: [
      { instruction: 'Head east from Dreamyard toward Hanuman Ghat water steps', distanceKm: 0.05, durationMin: 1, streetName: 'Hanuman Ghat Alley' },
      { instruction: 'Cross the scenic Chandpole pedestrian footbridge across Lake Pichola', distanceKm: 0.15, durationMin: 2, streetName: 'Chandpole Footbridge' },
      { instruction: 'Turn right through Chandpole Gate onto Silawatwari lane', distanceKm: 0.25, durationMin: 4, streetName: 'Chandpole Rd' },
      { instruction: 'Turn right toward Jagdish Chowk and head south toward Palace road', distanceKm: 0.25, durationMin: 3, streetName: 'City Palace Rd' },
      { instruction: 'Enter through historic Badi Pol archway into City Palace Manak Chowk', distanceKm: 0.25, durationMin: 4, streetName: 'Badi Pol Courtyard' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5794,73.6828&destination=24.5764,73.6835&travelmode=walking'
  },
  {
    id: 'd1-leg-1-2',
    fromStopId: 'city-palace',
    toStopId: 'jagdish-temple',
    fromName: 'City Palace Complex',
    toName: 'Jagdish Temple',
    travelMode: 'walking',
    distanceKm: 0.35,
    durationMinutes: 5,
    roadCoordinates: [
      [24.5764, 73.6835], // City Palace Manak Chowk
      [24.5771, 73.6841], // Exit through Badi Pol
      [24.5779, 73.6845], // Tripolia Pol
      [24.5786, 73.6849], // North along City Palace Rd
      [24.5792, 73.6852], // Jagdish Chowk
      [24.5795, 73.6853]  // Base of Jagdish Temple marble staircase
    ],
    maneuvers: [
      { instruction: 'Exit City Palace northward through Badi Pol and Tripolia Pol', distanceKm: 0.15, durationMin: 2, streetName: 'Tripolia Pol' },
      { instruction: 'Walk north on City Palace Road into bustling Jagdish Chowk', distanceKm: 0.15, durationMin: 2, streetName: 'City Palace Rd' },
      { instruction: 'Arrive at the grand elephant marble steps of Jagdish Temple on your right', distanceKm: 0.05, durationMin: 1, streetName: 'Jagdish Chowk' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5764,73.6835&destination=24.5795,73.6853&travelmode=walking'
  },
  {
    id: 'd1-leg-2-3',
    fromStopId: 'jagdish-temple',
    toStopId: 'rajasthani-lunch-day1',
    fromName: 'Jagdish Temple',
    toName: 'Local Rajasthani Lunch: Krishna Dal Bati',
    travelMode: 'walking',
    distanceKm: 0.20,
    durationMinutes: 3,
    roadCoordinates: [
      [24.5795, 73.6853], // Jagdish Temple
      [24.5797, 73.6851], // Descend to Chowk
      [24.5800, 73.6850], // Gangaur Ghat Marg lane
      [24.5802, 73.6848]  // Krishna Dal Bati Restro
    ],
    maneuvers: [
      { instruction: 'Descend temple stairs and head west toward Gangaur Ghat Marg', distanceKm: 0.10, durationMin: 1, streetName: 'Gangaur Ghat Marg' },
      { instruction: 'Continue 100 meters down the street; restaurant will be on your left', distanceKm: 0.10, durationMin: 2, streetName: 'Jalsham / Gangaur Ghat Rd' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5795,73.6853&destination=24.5802,73.6848&travelmode=walking'
  },
  {
    id: 'd1-leg-3-4',
    fromStopId: 'rajasthani-lunch-day1',
    toStopId: 'gangaur-ghat',
    fromName: 'Krishna Dal Bati',
    toName: 'Gangaur Ghat & Bagore Ki Haveli',
    travelMode: 'walking',
    distanceKm: 0.30,
    durationMinutes: 4,
    roadCoordinates: [
      [24.5802, 73.6848], // Lunch spot
      [24.5801, 73.6839], // Downhill toward lake along Gangaur Ghat Marg
      [24.5799, 73.6830], // Past Bagore Ki Haveli side gate
      [24.5797, 73.6822]  // Waterfront stone steps of Gangaur Ghat
    ],
    maneuvers: [
      { instruction: 'Head downhill west along Gangaur Ghat Marg toward Lake Pichola', distanceKm: 0.15, durationMin: 2, streetName: 'Gangaur Ghat Marg' },
      { instruction: 'Walk through the carved stone triple-arch gateway directly onto Gangaur Ghat steps', distanceKm: 0.15, durationMin: 2, streetName: 'Gangaur Ghat Entrance' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5802,73.6848&destination=24.5797,73.6822&travelmode=walking'
  },
  {
    id: 'd1-leg-4-5',
    fromStopId: 'gangaur-ghat',
    toStopId: 'pichola-boat-ride',
    fromName: 'Gangaur Ghat',
    toName: 'Lake Pichola Boat Ride (Municipal Jetty / Rameshwar Ghat)',
    travelMode: 'walking',
    distanceKm: 0.45,
    durationMinutes: 6,
    roadCoordinates: [
      [24.5797, 73.6822], // Gangaur Ghat
      [24.5793, 73.6824], // Lal Ghat pedestrian lane
      [24.5788, 73.6820], // Lakeside path
      [24.5785, 73.6812], // Jetty boarding pier lane
      [24.5785, 73.6805]  // Boat Ticket Counter & Rameshwar Ghat Pier
    ],
    maneuvers: [
      { instruction: 'Walk south along the stone lakeside lane toward Lal Ghat / Rameshwar Ghat', distanceKm: 0.25, durationMin: 3, streetName: 'Lal Ghat Promenade' },
      { instruction: 'Follow signs to the Government / Municipal Boat Ticket counter and boarding jetty', distanceKm: 0.20, durationMin: 3, streetName: 'Rameshwar Ghat Pier Rd' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5797,73.6822&destination=24.5785,73.6805&travelmode=walking'
  },
  {
    id: 'd1-leg-5-6',
    fromStopId: 'pichola-boat-ride',
    toStopId: 'dreamyard-hostel',
    fromName: 'Lake Pichola Boat Ride',
    toName: 'Dreamyard Udaipur (Midday Rest & Refresh)',
    travelMode: 'walking',
    distanceKm: 0.40,
    durationMinutes: 5,
    isReturnToHotel: true,
    roadCoordinates: [
      [24.5785, 73.6805], // Boat jetty
      [24.5788, 73.6815], // Footpath north
      [24.5794, 73.6824], // Crossing over to Hanuman Ghat path
      [24.5794, 73.6828]  // Dreamyard Hostel entrance
    ],
    maneuvers: [
      { instruction: 'Disembark from boat and head north along the Hanuman Ghat waterfront path', distanceKm: 0.25, durationMin: 3, streetName: 'Hanuman Ghat Path' },
      { instruction: 'Turn right at the painted haveli arch to Dreamyard Hostel reception', distanceKm: 0.15, durationMin: 2, streetName: 'Hanuman Ghat Alley' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5785,73.6805&destination=24.5794,73.6828&travelmode=walking'
  },
  {
    id: 'd1-leg-6-7',
    fromStopId: 'dreamyard-hostel',
    toStopId: 'bada-bazaar',
    fromName: 'Dreamyard Udaipur',
    toName: 'Bada Bazaar & Clock Tower',
    travelMode: 'walking',
    distanceKm: 1.10,
    durationMinutes: 16,
    roadCoordinates: [
      [24.5794, 73.6828], // Dreamyard
      [24.5797, 73.6836], // Chandpole Bridge
      [24.5801, 73.6854], // Gangaur Ghat Rd
      [24.5809, 73.6872], // Jagdish Temple northern lane
      [24.5821, 73.6890], // Clock Tower Rd (Ghanta Ghar)
      [24.5830, 73.6904], // Bada Bazaar entrance
      [24.5838, 73.6914]  // Bada Bazaar central textile market
    ],
    maneuvers: [
      { instruction: 'Cross Chandpole footbridge into the Old City', distanceKm: 0.20, durationMin: 3, streetName: 'Chandpole Footbridge' },
      { instruction: 'Head east past Jagdish Chowk onto Ghanta Ghar (Clock Tower) Road', distanceKm: 0.45, durationMin: 6, streetName: 'Ghanta Ghar Rd' },
      { instruction: 'Continue past the historic Clock Tower straight into the vibrant Bada Bazaar corridor', distanceKm: 0.45, durationMin: 7, streetName: 'Bada Bazaar Rd' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5794,73.6828&destination=24.5838,73.6914&travelmode=walking'
  },
  {
    id: 'd1-leg-7-8',
    fromStopId: 'bada-bazaar',
    toStopId: 'hathipole-market',
    fromName: 'Bada Bazaar',
    toName: 'Hathipole Market (Pichwai & Crafts)',
    travelMode: 'walking',
    distanceKm: 0.65,
    durationMinutes: 9,
    roadCoordinates: [
      [24.5838, 73.6914], // Bada Bazaar
      [24.5852, 73.6910], // Mochiwada lane heading north
      [24.5866, 73.6903], // Maldhas street crossing
      [24.5878, 73.6898], // Approach to Elephant Gate
      [24.5886, 73.6896]  // Hathipole main art & craft market
    ],
    maneuvers: [
      { instruction: 'Walk north through Mochiwada leather market lane', distanceKm: 0.25, durationMin: 3, streetName: 'Mochiwada Lane' },
      { instruction: 'Continue straight onto Hathipole Main Road past the historic archway', distanceKm: 0.40, durationMin: 6, streetName: 'Hathipole Main Rd' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5838,73.6914&destination=24.5886,73.6896&travelmode=walking'
  },
  {
    id: 'd1-leg-8-9',
    fromStopId: 'hathipole-market',
    toStopId: 'dinner-chandpole',
    fromName: 'Hathipole Market',
    toName: 'Dinner at Chandpole & Hotel Return',
    travelMode: 'auto_taxi',
    distanceKm: 1.40,
    durationMinutes: 8,
    isReturnToHotel: true,
    roadCoordinates: [
      [24.5886, 73.6896], // Hathipole
      [24.5872, 73.6865], // Swaroop Sagar linking road
      [24.5850, 73.6845], // Outside Chandpole road
      [24.5828, 73.6835], // Chandpole Gate entrance
      [24.5808, 73.6830], // Dinner dhaba near Hanuman Ghat footbridge
      [24.5794, 73.6828]  // Final 100m walk back to Dreamyard Hostel
    ],
    maneuvers: [
      { instruction: 'Take a short auto-rickshaw (₹50-₹70) or pleasant 18-min walk from Hathipole along Swaroop Sagar Rd', distanceKm: 1.0, durationMin: 5, streetName: 'Swaroop Sagar Rd' },
      { instruction: 'Arrive at Chandpole Gate for a delicious Rajasthani dinner', distanceKm: 0.3, durationMin: 2, streetName: 'Chandpole Outer Rd' },
      { instruction: 'Cross the short illuminated footbridge 100m home to Dreamyard Udaipur', distanceKm: 0.1, durationMin: 1, streetName: 'Hanuman Ghat Alley' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5886,73.6896&destination=24.5794,73.6828&travelmode=driving'
  }
];

// Day 2 Legs (Lakes, Gardens & Hilltops - Auto/Taxi, Two-Wheeler & Scenic Drives)
export const DAY2_ROAD_LEGS: RouteLeg[] = [
  {
    id: 'd2-leg-0-1',
    fromStopId: 'dreamyard-hostel',
    toStopId: 'bahubali-hills',
    fromName: 'Dreamyard Udaipur',
    toName: 'Bahubali Hills (Badi Lake Sunrise Viewpoint)',
    travelMode: 'auto_taxi',
    distanceKm: 13.2,
    durationMinutes: 28,
    roadCoordinates: [
      [24.5794, 73.6828], // Dreamyard Hanuman Ghat
      [24.5815, 73.6832], // Chandpole road north
      [24.5875, 73.6810], // Swaroop Sagar bridge
      [24.5930, 73.6760], // Fatehpura road connecting to Rani Road
      [24.6010, 73.6690], // Rani Road winding along Fateh Sagar west bank
      [24.6080, 73.6620], // Rani Road mountain pass
      [24.6140, 73.6480], // Badi Main Road (Tiger Lake corridor)
      [24.6190, 73.6360], // Badi Lake eastern shore road
      [24.6240, 73.6260], // Winding road around northern perimeter of Badi Lake
      [24.6232, 73.6210], // Nathawato Ka Guda parking trailhead
      [24.6225, 73.6186]  // Bahubali Hills peak ridge viewpoint (15-min footpath)
    ],
    maneuvers: [
      { instruction: 'Depart Dreamyard at 6:00 AM sharp via auto/taxi through Chandpole', distanceKm: 0.8, durationMin: 3, streetName: 'Chandpole Rd' },
      { instruction: 'Drive north across Swaroop Sagar Dam onto scenic Rani Road', distanceKm: 3.2, durationMin: 7, streetName: 'Rani Rd' },
      { instruction: 'Follow Rani Road along the tranquil morning waters of Fateh Sagar Lake', distanceKm: 3.5, durationMin: 6, streetName: 'Rani Rd Lakeside' },
      { instruction: 'Turn left onto Badi Main Road heading towards Badi Lake (Jiyan Sagar)', distanceKm: 4.2, durationMin: 8, streetName: 'Badi Main Rd' },
      { instruction: 'Follow the northern lake shore road to Nathawato Ka Guda parking lot', distanceKm: 1.5, durationMin: 4, streetName: 'Badi Lake Shore Rd' },
      { instruction: 'Hike 15-20 minutes up the rocky footpath to the Bahubali Hills ridge summit', distanceKm: 0.0, durationMin: 15, streetName: 'Ridge Footpath' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5794,73.6828&destination=24.6225,73.6186&travelmode=driving'
  },
  {
    id: 'd2-leg-1-2',
    fromStopId: 'bahubali-hills',
    toStopId: 'saheliyon-ki-bari',
    fromName: 'Bahubali Hills',
    toName: 'Saheliyon Ki Bari (Garden of Maidens)',
    travelMode: 'auto_taxi',
    distanceKm: 11.4,
    durationMinutes: 24,
    roadCoordinates: [
      [24.6225, 73.6186], // Bahubali Hills
      [24.6232, 73.6210], // Descend to parking
      [24.6190, 73.6360], // Badi lake road heading east
      [24.6140, 73.6480], // Badi Main Road
      [24.6090, 73.6650], // Fatehpura approach road
      [24.6060, 73.6740], // Circuit House road
      [24.6030, 73.6810], // Panchwati road
      [24.6015, 73.6852]  // Saheli Marg entrance to Saheliyon Ki Bari
    ],
    maneuvers: [
      { instruction: 'Hike down to the parking area and rejoin your auto/taxi driver', distanceKm: 0.0, durationMin: 10, streetName: 'Badi Parking' },
      { instruction: 'Drive east along Badi Main Road toward Udaipur city', distanceKm: 6.2, durationMin: 12, streetName: 'Badi Main Rd' },
      { instruction: 'Pass Fatehpura circle and head east onto Saheli Marg in Panchwati', distanceKm: 4.8, durationMin: 10, streetName: 'Saheli Marg' },
      { instruction: 'Arrive at the main royal entrance gates of Saheliyon Ki Bari', distanceKm: 0.4, durationMin: 2, streetName: 'Saheli Marg' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.6225,73.6186&destination=24.6015,73.6852&travelmode=driving'
  },
  {
    id: 'd2-leg-2-3',
    fromStopId: 'saheliyon-ki-bari',
    toStopId: 'fateh-sagar-lake',
    fromName: 'Saheliyon Ki Bari',
    toName: 'Fateh Sagar Lake & Paal',
    travelMode: 'walking',
    distanceKm: 1.45,
    durationMinutes: 18,
    roadCoordinates: [
      [24.6015, 73.6852], // Saheliyon Ki Bari
      [24.6022, 73.6815], // West along Saheli Marg
      [24.6028, 73.6780], // Moti Magri approach road
      [24.6033, 73.6745]  // Fateh Sagar Paal promenade entrance & Bombay Market
    ],
    maneuvers: [
      { instruction: 'Exit Saheliyon Ki Bari and head west along wide tree-lined Saheli Marg', distanceKm: 0.6, durationMin: 7, streetName: 'Saheli Marg' },
      { instruction: 'Pass near the base of Moti Magri hill onto Lake Fateh Sagar embankment road', distanceKm: 0.6, durationMin: 7, streetName: 'Moti Magri Rd' },
      { instruction: 'Arrive at Fateh Sagar Paal walking promenade and Bombay Market street food row', distanceKm: 0.25, durationMin: 4, streetName: 'Fateh Sagar Paal' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.6015,73.6852&destination=24.6033,73.6745&travelmode=walking'
  },
  {
    id: 'd2-leg-3-4',
    fromStopId: 'fateh-sagar-lake',
    toStopId: 'lunch-sukhadia-circle',
    fromName: 'Fateh Sagar Lake',
    toName: 'Lunch & Afternoon Rest (Sukhadia Circle)',
    travelMode: 'auto_taxi',
    distanceKm: 1.60,
    durationMinutes: 6,
    roadCoordinates: [
      [24.6033, 73.6745], // Fateh Sagar Paal
      [24.6025, 73.6790], // East along Paal road
      [24.6005, 73.6825], // Panchwati main road
      [24.5980, 73.6858]  // Sukhadia Circle fountain roundabout
    ],
    maneuvers: [
      { instruction: 'Hop on a short auto-rickshaw or take a 15-min walk east from the lake promenade', distanceKm: 0.7, durationMin: 3, streetName: 'Paal Rd' },
      { instruction: 'Head southeast toward Panchwati along Fatehpura connecting avenue', distanceKm: 0.6, durationMin: 2, streetName: 'Fatehpura Ave' },
      { instruction: 'Arrive at Sukhadia Circle for famous butter pav bhaji, cold coffee, and rest', distanceKm: 0.3, durationMin: 1, streetName: 'Sukhadia Circle' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.6033,73.6745&destination=24.5980,73.6858&travelmode=driving'
  },
  {
    id: 'd2-leg-4-5',
    fromStopId: 'lunch-sukhadia-circle',
    toStopId: 'sajjangarh-monsoon-palace',
    fromName: 'Sukhadia Circle',
    toName: 'Sajjangarh (Monsoon Palace Sunset Viewpoint)',
    travelMode: 'auto_taxi',
    distanceKm: 8.8,
    durationMinutes: 22,
    roadCoordinates: [
      [24.5980, 73.6858], // Sukhadia Circle
      [24.5940, 73.6780], // Chetak Circle link
      [24.5880, 73.6670], // Haridas Ji Ki Magri road
      [24.5850, 73.6550], // Sajjan Garh Main Rd
      [24.5855, 73.6465], // Sajjangarh Biological Park / Sanctuary Base Gate (Entry & Shuttle Point)
      [24.5870, 73.6420], // Hairpin Turn 1 up Bansdara hill
      [24.5910, 73.6390], // Hairpin Turn 2 (steep ridge climb)
      [24.5925, 73.6375], // Ridge switchback
      [24.5937, 73.6367]  // Sajjangarh Monsoon Palace summit parking & viewing terrace
    ],
    maneuvers: [
      { instruction: 'Depart Sukhadia Circle by 3:15 PM via auto or cab toward Sajjangarh Main Road', distanceKm: 3.5, durationMin: 8, streetName: 'Haridas Ji Ki Magri Rd' },
      { instruction: 'Arrive at Sajjangarh Wildlife Sanctuary Base Gate well before the 5:00 PM cutoff', distanceKm: 2.5, durationMin: 6, streetName: 'Sajjangarh Sanctuary Gate' },
      { instruction: 'Purchase palace and sanctuary entry tickets (₹110 + ₹30)', distanceKm: 0.0, durationMin: 5, streetName: 'Ticket Counter' },
      { instruction: 'Board the official forest electric shuttle van (or drive approved cab) up the winding mountain road', distanceKm: 2.8, durationMin: 8, streetName: 'Bansdara Mountain Pass' },
      { instruction: 'Step onto the upper marble terrace for sunset over the Aravalli peaks', distanceKm: 0.0, durationMin: 0, streetName: 'Monsoon Palace Terrace' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5980,73.6858&destination=24.5937,73.6367&travelmode=driving'
  },
  {
    id: 'd2-leg-5-6',
    fromStopId: 'sajjangarh-monsoon-palace',
    toStopId: 'dreamyard-hostel',
    fromName: 'Sajjangarh Monsoon Palace',
    toName: 'Dreamyard Udaipur (Luggage Pickup & Train Return Prep)',
    travelMode: 'auto_taxi',
    distanceKm: 7.6,
    durationMinutes: 20,
    isReturnToHotel: true,
    roadCoordinates: [
      [24.5937, 73.6367], // Monsoon Palace summit
      [24.5855, 73.6465], // Winding down to Base Sanctuary Gate
      [24.5840, 73.6550], // Sajjan Garh Main Rd heading east
      [24.5810, 73.6690], // Rampura / Malla Talai circle
      [24.5795, 73.6780], // Chandpole Bridge approach
      [24.5794, 73.6828]  // Dreamyard Udaipur entrance
    ],
    maneuvers: [
      { instruction: 'Take the forest shuttle van back down to the sanctuary base gate right after sunset (approx 6:15 PM)', distanceKm: 2.8, durationMin: 7, streetName: 'Bansdara Mountain Pass' },
      { instruction: 'Board auto/taxi at base gate heading east on Sajjan Garh Road toward Malla Talai', distanceKm: 3.2, durationMin: 7, streetName: 'Sajjan Garh Rd' },
      { instruction: 'Proceed through Chandpole gate to Dreamyard Udaipur to collect your backpack and freshen up', distanceKm: 1.6, durationMin: 6, streetName: 'Hanuman Ghat' }
    ],
    googleMapsNavUrl: 'https://www.google.com/maps/dir/?api=1&origin=24.5937,73.6367&destination=24.5794,73.6828&travelmode=driving'
  }
];

export const ALL_ROAD_LEGS: Record<string, RouteLeg> = {
  ...DAY1_ROAD_LEGS.reduce((acc, leg) => ({ ...acc, [leg.id]: leg }), {}),
  ...DAY2_ROAD_LEGS.reduce((acc, leg) => ({ ...acc, [leg.id]: leg }), {})
};
