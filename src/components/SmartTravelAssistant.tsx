import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MapPin, 
  Utensils, 
  IndianRupee, 
  Sun, 
  Navigation, 
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { ItineraryDay, ItineraryStop, Expense } from '../types/travel';
import { calculateBudgetSummary } from '../services/budgetService';
import { UDAIPUR_FOOD_SPOTS } from '../services/foodData';

interface SmartTravelAssistantProps {
  day1: ItineraryDay;
  day2: ItineraryDay;
  expenses: Expense[];
  activeDay: 1 | 2;
  onSelectStopOnMap: (stop: ItineraryStop) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionLabel?: string;
  targetStop?: ItineraryStop;
}

export const SmartTravelAssistant: React.FC<SmartTravelAssistantProps> = ({
  day1,
  day2,
  expenses,
  activeDay,
  onSelectStopOnMap
}) => {
  const currentDay = activeDay === 1 ? day1 : day2;
  const budgetSummary = calculateBudgetSummary(expenses);

  // Pre-configured questions from requirements
  const promptSuggestions = [
    'What is my next destination?',
    'How far is my next stop?',
    'What is the cheapest way to reach it?',
    'Where can I eat within ₹150?',
    'How much budget is remaining?',
    'Can I visit Sajjangarh before sunset?',
    'How do I return to Dreamyard?'
  ];

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Namaste! I am your Udaipur Smart Route Assistant. I track your live itinerary, actual road distances, opening hours, budget balance, and sunset timing. Ask me anything about your 2-day trip!'
    }
  ]);

  const handleSendQuery = (queryText: string) => {
    const q = queryText.trim().toLowerCase();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText
    };

    let replyText = '';
    let targetStop: ItineraryStop | undefined;
    let actionLabel: string | undefined;

    // 1. Next destination
    if (q.includes('next destination') || q.includes('next stop')) {
      const next = currentDay.stops.find(s => s.stopNumber > 0 && !s.isCompleted);
      if (next) {
        targetStop = next;
        actionLabel = `View ${next.place.name} on Map`;
        replyText = `Your next stop is Stop ${next.stopNumber}: ${next.place.name} (${next.suggestedTime}). Entry is ${next.place.entryFee.amount === 0 ? 'FREE' : `₹${next.place.entryFee.amount}`}. Notes: ${next.notes || 'Ready for navigation!'}`;
      } else {
        replyText = `Congratulations! You have completed all scheduled sightseeing stops for Day ${currentDay.dayNumber}. Your next step is returning to Dreamyard Udaipur.`;
      }
    }
    // 2. Distance to next stop
    else if (q.includes('how far') || q.includes('distance')) {
      const next = currentDay.stops.find(s => s.stopNumber > 0 && !s.isCompleted);
      if (next) {
        const leg = currentDay.legs.find(l => l.toStopId === next.place.id);
        const dist = leg ? `${leg.distanceKm} km (${leg.durationMinutes} mins by ${leg.travelMode})` : 'less than 1 km';
        replyText = `The road distance to your next stop (${next.place.name}) is ${dist}. It follows actual road networks, not straight lines.`;
      } else {
        replyText = `All stops completed for today! Dreamyard Hostel is your home base on Lake Pichola.`;
      }
    }
    // 3. Cheapest way
    else if (q.includes('cheapest way') || q.includes('cheapest')) {
      if (currentDay.dayNumber === 1) {
        replyText = `For Day 1 in the Old City, WALKING is completely free, fastest, and the cheapest mode! Old City alleyways around Jagdish Chowk, Gangaur Ghat, and City Palace are pedestrian-friendly and too narrow for cars.`;
      } else {
        replyText = `For Day 2, Bahubali Hills is 13 km away. The cheapest mode is either a shared auto/tempo (₹30-₹50 from Chetak/Fatehpura) or hiring a scooter/bike (₹350-₹450/day). For Sajjangarh hill, take the shared electric shuttle van at the forest gate for ₹100-₹150 round trip.`;
      }
    }
    // 4. Food within 150
    else if (q.includes('150') || q.includes('eat') || q.includes('food')) {
      const cheapSpots = UDAIPUR_FOOD_SPOTS.filter(s => s.avgCostPerPerson <= 150);
      replyText = `Top authentic budget eats under ₹150 nearby:\n` +
        cheapSpots.map(s => `• ${s.name}: ~₹${s.avgCostPerPerson} (${s.famousDishes[0]}) · ${s.distanceFromDreamyardKm} km away`).join('\n') +
        `\nFor a full meal, Krishna Dal Bati is just ~₹180 with unlimited dal!`;
    }
    // 5. Budget remaining
    else if (q.includes('budget') || q.includes('money') || q.includes('spent')) {
      replyText = `You have spent ₹${budgetSummary.totalSpent} out of your ₹5,000 budget. You have ₹${budgetSummary.remainingMoney} remaining (${100 - budgetSummary.percentageSpent}% unspent). Planned breakdown: Train (₹900), Hostel (₹750), Food (₹1,150), Sightseeing (₹550), Pichola Boat (₹400), Autos (₹650), Shopping (₹350), Emergency (₹250).`;
    }
    // 6. Sajjangarh before sunset
    else if (q.includes('sunset') || q.includes('sajjangarh')) {
      replyText = `CRITICAL TIMING RULE: In late November, sunset is around 05:42 PM. The Sajjangarh Wildlife Sanctuary base gate strictly stops ticket issuance and shuttle entries between 05:00 PM and 05:30 PM! You MUST depart Sukhadia Circle by 03:15-03:30 PM to reach the hilltop palace terrace in time for the golden sunset panorama.`;
    }
    // 7. Return to Dreamyard
    else if (q.includes('dreamyard') || q.includes('return') || q.includes('hotel')) {
      replyText = `To return to Dreamyard Udaipur (Hanuman Ghat, Chandpole):\n• From Old City: Walk west across the Chandpole footbridge onto Hanuman Ghat path (2-5 mins).\n• From Sajjangarh / Badi Lake: Take an auto-rickshaw to Chandpole Gate (₹100-₹150), then cross the pedestrian bridge 100 meters to the hostel.`;
    }
    // General fallback
    else {
      replyText = `I have updated your itinerary details for Day ${currentDay.dayNumber}. Would you like to check: (1) Next destination directions, (2) Authentic food nearby, (3) Budget balance, or (4) Bahubali hills / Sajjangarh timings?`;
    }

    const assistantMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      targetStop,
      actionLabel
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInputQuery('');
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 flex flex-col h-[560px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-sand-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-mewar-gold flex items-center justify-center text-charcoal-950 font-bold shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-charcoal-900">
              Smart Itinerary Assistant
            </h3>
            <p className="text-[11px] text-sand-500 font-sans">
              Context-aware Q&A based on live itinerary, real roads, and ₹5,000 budget
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
          Active
        </span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-charcoal-900 text-white rounded-tr-none'
                  : 'bg-cream-50 text-charcoal-900 border border-sand-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
              {msg.actionLabel && msg.targetStop && (
                <button
                  onClick={() => onSelectStopOnMap(msg.targetStop!)}
                  className="mt-2.5 px-3 py-1.5 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{msg.actionLabel}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompt Pills */}
      <div className="py-2 overflow-x-auto flex gap-1.5 border-t border-sand-100 shrink-0 no-scrollbar">
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendQuery(prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-sand-100 hover:bg-sand-200 text-charcoal-800 text-[11px] font-medium transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery(inputQuery);
        }}
        className="pt-2 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          placeholder="Ask a question about routes, food, budget, timings..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-sand-300 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-mewar-gold bg-sand-50"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 font-bold transition-all shadow-sm"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
