import React, { useState } from 'react';
import { 
  Compass, 
  Map, 
  Calendar, 
  MapPin, 
  Utensils, 
  IndianRupee, 
  CheckSquare, 
  Menu, 
  X,
  Bot,
  CloudSun,
  ShieldCheck
} from 'lucide-react';
import { Expense } from '../types/travel';
import { calculateBudgetSummary } from '../services/budgetService';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  expenses: Expense[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  expenses
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const budgetSummary = calculateBudgetSummary(expenses);

  const navItems = [
    { id: 'overview', label: 'My Trip', icon: Compass },
    { id: 'map', label: 'Interactive Map', icon: Map },
    { id: 'day1', label: 'Day 1', icon: Calendar },
    { id: 'day2', label: 'Day 2', icon: Calendar },
    { id: 'places', label: 'Places', icon: MapPin },
    { id: 'food', label: 'Food & Markets', icon: Utensils },
    { id: 'budget', label: 'Budget', icon: IndianRupee },
    { id: 'assistant', label: 'Smart Assistant', icon: Bot },
    { id: 'weather', label: 'Weather & Safety', icon: CloudSun },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sand-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-mewar-terracotta via-mewar-gold to-amber-300 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-charcoal-900 rounded-[14px] flex items-center justify-center text-mewar-gold font-bold">
                <Compass className="w-5 h-5 text-mewar-gold" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-extrabold text-base tracking-tight text-charcoal-950">
                  Udaipur Route Planner
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-900 rounded border border-emerald-300">
                  100% Free
                </span>
              </div>
              <p className="text-[10px] text-sand-500 font-sans tracking-wide">
                Chalo Chalte Hain · Solo Road Trip
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-charcoal-900 text-white shadow-sm'
                      : 'text-charcoal-700 hover:text-charcoal-950 hover:bg-sand-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-mewar-gold' : 'text-sand-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Quick Free Engine Pill */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Open Routing</span>
            </div>

            {/* Quick Budget Indicator */}
            <button
              onClick={() => onSelectTab('budget')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                budgetSummary.isExceeded
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-cream-50 border-sand-200 text-charcoal-800 hover:border-mewar-gold'
              }`}
              title="Click to view full ₹5,000 budget breakdown"
            >
              <IndianRupee className="w-3.5 h-3.5 text-mewar-amber" />
              <span>₹{budgetSummary.remainingMoney} left</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-sand-100 text-charcoal-900 hover:bg-sand-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-sand-200 space-y-1 animate-fadeIn">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-charcoal-900 text-white font-bold'
                      : 'text-charcoal-800 hover:bg-sand-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-mewar-gold' : 'text-sand-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'budget' && (
                    <span className="text-[11px] font-bold text-mewar-amber">
                      ₹{budgetSummary.remainingMoney} remaining
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
