import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Train, 
  Luggage, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Plus, 
  Trash2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'transit' | 'gear' | 'docs' | 'safety';
  text: string;
  isDone: boolean;
}

const CHECKLIST_STORAGE_KEY = 'udaipur_travel_checklist_v1';

const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Transit & Vadodara Rail
  { id: 'c-1', category: 'transit', text: 'Confirm Vadodara Junction (BRC) to Udaipur City (UDZ) train ticket PNR', isDone: true },
  { id: 'c-2', category: 'transit', text: 'Confirm Return train from Udaipur City to Vadodara', isDone: true },
  { id: 'c-3', category: 'transit', text: 'Note auto-rickshaw fare from Udaipur station to Dreamyard (~₹100 prepaid booth)', isDone: false },
  // Gear & Footwear
  { id: 'c-4', category: 'gear', text: 'Comfortable sports shoes with grip for Bahubali Hills rock trail', isDone: false },
  { id: 'c-5', category: 'gear', text: 'Light jacket / windbreaker for 6:00 AM Badi Lake sunrise & evening rooftop breeze', isDone: false },
  { id: 'c-6', category: 'gear', text: 'Reusable steel water bottle (refill at Dreamyard)', isDone: false },
  { id: 'c-7', category: 'gear', text: '10,000+ mAh power bank & charging cable for phone photography', isDone: false },
  // Documents & Cash
  { id: 'c-8', category: 'docs', text: 'Physical Government ID (Aadhaar/Voter ID) for hotel check-in and monument entry', isDone: true },
  { id: 'c-9', category: 'docs', text: 'Keep ₹1,500 in physical cash notes (₹10, ₹20, ₹50, ₹100) for boat tickets & street dhabas', isDone: false },
  // Safety & Protocols
  { id: 'c-10', category: 'safety', text: 'Verify Sajjangarh base gate arrival time before 3:30 PM (gate stops entry by 5:30 PM)', isDone: true },
  { id: 'c-11', category: 'safety', text: 'Arrange round-trip auto driver the previous night for 6:00 AM Bahubali Hills departure', isDone: false }
];

export const TravelChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to load checklist:', e);
    }
    return INITIAL_CHECKLIST;
  });

  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'transit' | 'gear' | 'docs' | 'safety'>('gear');

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save checklist:', e);
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isDone: !item.isDone } : item));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: newItemCategory,
      text: newItemText.trim(),
      isDone: false
    };

    setItems(prev => [...prev, newItem]);
    setNewItemText('');
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const completedCount = items.filter(i => i.isDone).length;
  const progressPct = Math.round((completedCount / (items.length || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-charcoal-900 text-white">
              Trip Preparation
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-charcoal-900">
            Solo Travel Checklist & Essentials
          </h2>
          <p className="text-xs text-sand-500 font-sans mt-0.5">
            Key preparations for Vadodara transit, Dreamyard hostel stay, sunrise hiking, and budget control.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="px-4 py-2 rounded-2xl bg-cream-50 border border-sand-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
            {progressPct}%
          </div>
          <div className="text-left text-xs">
            <span className="text-[10px] uppercase font-bold text-sand-500 block">Checklist Readiness</span>
            <span className="font-bold text-charcoal-900">{completedCount} of {items.length} items ready</span>
          </div>
        </div>
      </div>

      {/* Add New Item */}
      <form onSubmit={addItem} className="bg-cream-50 p-4 rounded-2xl border border-sand-200 flex flex-wrap items-center gap-2 text-xs">
        <input
          type="text"
          placeholder="Add custom packing item or reminder..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-1 focus:ring-mewar-gold"
        />
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as 'transit' | 'gear' | 'docs' | 'safety')}
          className="px-3 py-2 rounded-xl border border-sand-300 bg-white font-medium focus:outline-none"
        >
          <option value="gear">Gear & Clothing</option>
          <option value="transit">Transit & Trains</option>
          <option value="docs">Cash & Docs</option>
          <option value="safety">Safety & Timings</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Item</span>
        </button>
      </form>

      {/* Checklist Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'transit', title: 'Vadodara Transit & Trains', icon: Train, color: 'text-blue-600 bg-blue-50' },
          { key: 'gear', title: 'Essential Gear & Footwear', icon: Luggage, color: 'text-amber-600 bg-amber-50' },
          { key: 'docs', title: 'Cash & ID Verification', icon: CreditCard, color: 'text-purple-600 bg-purple-50' },
          { key: 'safety', title: 'Sanctuary & Safety Timings', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' }
        ].map(section => {
          const sectionItems = items.filter(i => i.category === section.key);
          const Icon = section.icon;

          return (
            <div key={section.key} className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${section.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-base text-charcoal-900">
                  {section.title}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {sectionItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      item.isDone
                        ? 'bg-sand-50/70 border-sand-200 text-sand-500 line-through'
                        : 'bg-white border-sand-200 hover:border-sand-400 text-charcoal-800'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-mewar-gold shrink-0">
                        {item.isDone ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-sand-400" />}
                      </span>
                      <span className="leading-snug">{item.text}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(item.id);
                      }}
                      className="text-sand-400 hover:text-rose-500 p-0.5 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
