# Udaipur Smart Travel Route Planner (Chalo Chalte Hain)
### 100% Free Open Web Application · Personal 2-Day Precision Road Routing

A production-quality, responsive travel planning and road navigation web application built for a personal 2-day solo trip to Udaipur, Rajasthan, India (**24 & 25 November 2026**).

**100% Free & Open**: Zero Google Maps API keys, zero paid subscriptions, and zero accounts required. All road routes, distances, durations, and turn-by-turn navigation are powered by **OpenStreetMap** and **OSRM (Open Source Routing Machine)**.

Starting and ending at **Dreamyard Udaipur** (Hanuman Ghat, Lake Pichola), this application calculates actual road routes, distances, durations, turn-by-turn maneuvers, sightseeing tickets, authentic local Rajasthani food recommendations, and complete ₹5,000 budget tracking from Vadodara.

---

## 🌟 Key Features

1. **100% Free Open Road Navigation Engine (OpenStreetMap & Leaflet)**
   - **Zero API Keys Needed**: Instant out-of-the-box loading with zero setup.
   - **Real Road Networks**: Follows physical roads, lakeside promenades, and pedestrian footbridges (including Chandpole footbridge, Rani Road, Badi Main Road, and Bansdara mountain pass).
   - **Multiple Free Map Layers**: Switch between:
     - **Voyager**: Luxury warm heritage style by CartoDB.
     - **OSM Streets**: Standard OpenStreetMap.
     - **Satellite View**: High-resolution ESRI World Imagery.
     - **Topo**: OpenTopoMap with elevation contours for Bahubali Hills & Sajjangarh mountain.

2. **Sequential Journey & Road Navigation System**
   - Numbered stop markers (`H` for Hotel, `1`, `2`, `3`...).
   - Day 1 (Terracotta) and Day 2 (Deep Lake Blue) color coding.
   - Separate calculations for **Walking**, **Auto / Taxi**, **Two-Wheeler**, and **Driving**.
   - Every single leg features:
     - Verified road distance in kilometers.
     - Travel duration in minutes.
     - Turn-by-turn maneuvers with street names.
     - Direct **"Start Navigation"** button linking to turn-by-turn navigation on your mobile device.

3. **Trip Route Optimization ("OPTIMIZE MY TRIP")**
   - Compares the itinerary order against alternative topological sequences.
   - Minimizes backtracking and walking fatigue while respecting:
     - Monument opening hours (City Palace & Saheliyon Ki Bari at 9:00 AM).
     - Midday sunlight boat safari at Lake Pichola (2:00 PM).
     - Dawn sunrise hike timing at Bahubali Hills (6:00 AM departure).
     - Strict 5:00–5:30 PM last-entry cutoff at Sajjangarh Wildlife Sanctuary base gate.
   - 1-click apply and 1-click restore to original itinerary.

4. **Complete ₹5,000 Indian Rupee Budget Tracker**
   - Comprehensive budget allocations:
     - Vadodara to Udaipur Train: ₹450
     - Return Train to Vadodara: ₹450
     - Dreamyard Hostel (1 Night): ₹750
     - Food, Thalis, Snacks & Chai: ₹1,150
     - Local Transport & Shuttles: ₹650
     - Sightseeing & Palace Tickets: ₹550
     - Lake Pichola Shared Boat Safari: ₹400
     - Shopping & Souvenirs: ₹350
     - Contingency / Emergency Reserve: ₹250
     - **Total: Exactly ₹5,000**
   - Expense logger with instant balance calculation, category progress bars, and over-budget alerts.

5. **Live Location & Progress Tracking**
   - Optional GPS permission button ("Locate Me").
   - Identifies the nearest itinerary stop and calculates real-time distance.
   - Checkboxes on every stop to record progress (e.g. "5 of 15 completed") with confetti celebrations.
   - Persistent `localStorage` state across reloads.

6. **Places Directory & Cultural Context**
   - Verified coordinates, entry fees, opening hours, historical background, photography tips, safety advice, and official booking links.
   - Verified vs estimated flags with information audit timestamps.

7. **Authentic Rajasthani Food & Historic Bazaars**
   - Curated list of budget spots: Krishna Dal Bati Restro, Natraj Dining Hall (unlimited thali), JMB Sweets (pyaz kachori), Jheel's Ginger Coffee Bar, Sukhadia Circle street food plaza, and Bombay Market on Fateh Sagar Paal.
   - Filter by budget (Under ₹100, ₹150, ₹250) and sort by distance from Dreamyard Hostel.
   - Market bargaining advice for Bada Bazaar, Hathipole (Pichwai art), and Mochiwada (camel leather mojris).

8. **Live Udaipur Weather & Solar Timings**
   - Live meteorological conditions fetched from Open-Meteo for Udaipur (24.5854° N, 73.7125° E).
   - Sunrise and sunset times for scheduling dawn hikes and golden hour photography.
   - Specific hiking safety guidelines for Bahubali Hills (uneven rocky trail, grip sneakers, monkey precautions).

9. **Smart Travel Assistant**
   - Contextual Q&A answering:
     - "What is my next destination?"
     - "How far is my next stop?"
     - "What is the cheapest way to reach it?"
     - "Where can I eat within ₹150?"
     - "How much budget is remaining?"
     - "Can I visit Sajjangarh before sunset?"
     - "How do I return to Dreamyard?"

10. **Mobile-First Experience**
    - Optimized for Android phones and small touchscreens.
    - Persistent bottom navigation bar.
    - Full-width interactive map with touch-friendly controls.

---

## 📅 Day-by-Day Itinerary

### Day 1: Old City, Heritage Palaces & Lake Pichola (24 Nov 2026)
- **STOP 0 (08:30 AM)**: Dreamyard Udaipur (Starting Base, Hanuman Ghat)
- **STOP 1 (09:00 AM)**: City Palace Complex (Museum, Mor Chowk, Zenana Mahal · ₹400 · 2.5 hrs)
- **STOP 2 (11:30 AM)**: Jagdish Temple (Indo-Aryan architecture, Vishnu Darshan · Free · 30 min)
- **STOP 3 (12:00 PM)**: Local Rajasthani Lunch at Krishna Dal Bati Restro (~₹180 · Desi Ghee Baatis)
- **STOP 4 (01:00 PM)**: Gangaur Ghat & Bagore Ki Haveli (Waterfront stone steps · Free)
- **STOP 5 (02:00 PM)**: Lake Pichola Boat Ride (Rameshwar Municipal Jetty · ₹400 · 60 min)
- **STOP 6 (03:30 PM)**: Return Walk to Dreamyard (Rest & recharge)
- **STOP 7 (04:30 PM)**: Bada Bazaar & Clock Tower (Mojris, bandhani, silver)
- **STOP 8 (05:30 PM)**: Hathipole Market (Authentic Pichwai paintings & handicrafts)
- **STOP 9 (07:00 PM)**: Dinner at Chandpole & 100m walk back to Dreamyard

### Day 2: Lakes, Gardens, Hilltops & Monsoon Palace (25 Nov 2026)
- **STOP 0 (06:00 AM)**: Dreamyard Departure via auto/cab
- **STOP 1 (06:45 AM)**: Bahubali Hills / Badi Lake Viewpoint (Sunrise ridge hike · 15 min hike · ₹10)
- **STOP 2 (09:00 AM)**: Saheliyon Ki Bari (Garden of Maidens, marble elephant fountains · ₹20)
- **STOP 3 (10:30 AM)**: Fateh Sagar Lake & Paal (Lakeside promenade & Bombay Market coffee)
- **STOP 4 (12:00 PM)**: Lunch & Rest at Sukhadia Circle (Pav bhaji, thali, kulfi · ~₹140)
- **STOP 5 (03:30 PM)**: Sajjangarh Monsoon Palace (Bansdara mountain peak, sunset viewpoint · ₹140)
  - *Strict rule: base sanctuary gate stops ticketing by 5:00–5:30 PM!*
- **STOP 6 (06:30 PM)**: Return road route to Dreamyard (Luggage collection & transfer to Udaipur City Railway Station for Vadodara train)

---

## 🛠️ Technology Stack (100% Free & Open Source)

- **React 18** with **TypeScript**
- **Vite** (Lightning-fast bundler)
- **Tailwind CSS** (Luxury travel design system)
- **Leaflet & CartoDB** (OpenStreetMap interactive road map)
- **OSRM (Open Source Routing Machine)** (Real road network polylines & step-by-step maneuvers)
- **Open-Meteo API** (Free real-time Udaipur weather & solar timings)
- **Lucide Icons**
- **Canvas Confetti**

---

## 🚀 Running the Web Application

1. Open your terminal in this directory:
   ```bash
   cd "d:/project system/Chalo Chalte hain"
   ```

2. Start the local server:
   ```bash
   npm run dev
   ```

3. Open **http://localhost:5173** in your browser. Everything works instantly with zero setup or API keys!
