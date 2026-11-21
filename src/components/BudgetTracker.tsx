import React, { useState } from 'react';
import { 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  Trash2, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  PieChart, 
  ShieldCheck, 
  Info,
  DollarSign
} from 'lucide-react';
import { Expense, BudgetCategory, BudgetAllocation } from '../types/travel';
import { 
  BUDGET_ALLOCATIONS, 
  TOTAL_TRIP_BUDGET, 
  calculateBudgetSummary, 
  addExpense, 
  deleteExpense 
} from '../services/budgetService';

interface BudgetTrackerProps {
  expenses: Expense[];
  onExpensesChange: (newExpenses: Expense[]) => void;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({
  expenses,
  onExpensesChange
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<BudgetCategory>('food');
  const [dayNumber, setDayNumber] = useState<1 | 2>(1);
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const summary = calculateBudgetSummary(expenses);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    const updated = addExpense({
      title: title.trim(),
      amount: Math.round(numAmount),
      category,
      date: dayNumber === 1 ? '2026-11-24' : '2026-11-25',
      dayNumber,
      notes: notes.trim()
    });

    onExpensesChange(updated);
    setTitle('');
    setAmount('');
    setNotes('');
    setShowAddForm(false);
  };

  const handleDeleteExpense = (id: string) => {
    const updated = deleteExpense(id);
    onExpensesChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-mewar-gold text-charcoal-950">
              ₹5,000 Solo Trip Budget
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-charcoal-900">
            Trip Expense & Budget Tracker
          </h2>
          <p className="text-xs text-sand-500 font-sans mt-0.5">
            Real-time Indian Rupee accounting covering trains from Vadodara, Dreamyard stay, Mewari food, and sightseeing.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 rounded-xl bg-charcoal-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-mewar-gold" />
          <span>{showAddForm ? 'Close Form' : 'Log Expense (+)'}</span>
        </button>
      </div>

      {/* Warning Alert if exceeded or near limit */}
      {summary.isExceeded && (
        <div className="bg-rose-50 border border-rose-300 text-rose-900 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Budget Exceeded Alert!</p>
            <p>You have exceeded your planned ₹5,000 budget by ₹{Math.abs(summary.remainingMoney)}. Consider cutting down on shopping or opting for walking instead of autos.</p>
          </div>
        </div>
      )}

      {summary.isWarning && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Budget Caution: 85%+ Utilized</p>
            <p>You have ₹{summary.remainingMoney} remaining. Keep emergency contingency money safe for return transit.</p>
          </div>
        </div>
      )}

      {/* 4 Key KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block mb-1">
            Total Trip Budget
          </span>
          <div className="flex items-center gap-1 text-xl md:text-2xl font-serif font-extrabold text-charcoal-900">
            <span>₹</span>
            <span>{summary.totalBudget.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[11px] text-sand-500 mt-1">Fixed solo budget</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block mb-1">
            Total Spent
          </span>
          <div className="flex items-center gap-1 text-xl md:text-2xl font-serif font-extrabold text-mewar-ruby">
            <span>₹</span>
            <span>{summary.totalSpent.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[11px] text-sand-500 mt-1">{summary.percentageSpent}% of ₹5,000</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block mb-1">
            Remaining Funds
          </span>
          <div className={`flex items-center gap-1 text-xl md:text-2xl font-serif font-extrabold ${
            summary.remainingMoney >= 0 ? 'text-emerald-700' : 'text-rose-600'
          }`}>
            <span>₹</span>
            <span>{summary.remainingMoney.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[11px] text-sand-500 mt-1">
            {summary.remainingMoney >= 0 ? 'Available balance' : 'Over budget'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-luxury border border-sand-200">
          <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block mb-1">
            Daily Burn Rate
          </span>
          <div className="text-xs space-y-1 mt-1 text-charcoal-800">
            <div className="flex justify-between">
              <span className="text-sand-500">Day 1 (Old City):</span>
              <strong className="font-bold">₹{summary.day1Spent}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-500">Day 2 (Lakes & Hills):</span>
              <strong className="font-bold">₹{summary.day2Spent}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Form Modal / Collapsible */}
      {showAddForm && (
        <form onSubmit={handleAddExpense} className="bg-cream-50 p-5 rounded-2xl border border-sand-300 shadow-luxury space-y-4 animate-fadeIn">
          <h3 className="font-serif font-bold text-base text-charcoal-900 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-mewar-gold" />
            <span>Record New Trip Expense</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 mb-1">Expense Title</label>
              <input
                type="text"
                placeholder="e.g. City Palace ticket, Dal Baati lunch..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-1 focus:ring-mewar-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 mb-1">Amount (₹ INR)</label>
              <input
                type="number"
                placeholder="₹ Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
                className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-1 focus:ring-mewar-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 mb-1">Budget Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BudgetCategory)}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-1 focus:ring-mewar-gold"
              >
                {BUDGET_ALLOCATIONS.map(alloc => (
                  <option key={alloc.category} value={alloc.category}>
                    {alloc.name} (Plan: ₹{alloc.plannedAmount})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 mb-1">Itinerary Day</label>
              <select
                value={dayNumber}
                onChange={(e) => setDayNumber(Number(e.target.value) as 1 | 2)}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-1 focus:ring-mewar-gold"
              >
                <option value={1}>Day 1 (24 Nov 2026)</option>
                <option value={2}>Day 2 (25 Nov 2026)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <input
              type="text"
              placeholder="Optional notes / merchant location..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-2/3 px-3 py-2 rounded-xl border border-sand-300 bg-white text-xs focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-sand-500 hover:text-charcoal-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-mewar-gold hover:bg-mewar-gold-light text-charcoal-950 text-xs font-bold shadow-sm"
              >
                Save Expense
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Category Progress Bars Grid */}
      <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-4">
        <h3 className="font-serif font-bold text-base text-charcoal-900 flex items-center justify-between">
          <span>Category-by-Category Budget Performance</span>
          <span className="text-xs text-sand-500 font-sans font-normal">
            ₹{summary.totalSpent} of ₹{TOTAL_TRIP_BUDGET} utilized
          </span>
        </h3>

        {/* Global Progress Bar */}
        <div className="w-full h-3 bg-sand-100 rounded-full overflow-hidden flex">
          {summary.categories.map(cat => {
            const widthPct = (cat.spent / TOTAL_TRIP_BUDGET) * 100;
            if (widthPct <= 0) return null;
            return (
              <div
                key={cat.category}
                style={{ width: `${widthPct}%`, backgroundColor: cat.color }}
                title={`${cat.name}: ₹${cat.spent}`}
              />
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {summary.categories.map(cat => {
            const isOver = cat.spent > cat.planned;
            return (
              <div
                key={cat.category}
                className="p-3 rounded-xl bg-sand-50/70 border border-sand-200 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-charcoal-900 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <span className={`font-bold ${isOver ? 'text-rose-600' : 'text-charcoal-800'}`}>
                    ₹{cat.spent} / ₹{cat.planned}
                  </span>
                </div>

                {/* Progress bar per category */}
                <div className="w-full h-1.5 bg-sand-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isOver ? 'bg-rose-500' : 'bg-mewar-gold'}`}
                    style={{ width: `${Math.min(100, cat.percentageUsed)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-sand-500">
                  <span>{cat.percentageUsed}% used</span>
                  <span>
                    {cat.difference >= 0 ? `₹${cat.difference} remaining` : `₹${Math.abs(cat.difference)} over`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logged Expenses List */}
      <div className="bg-white rounded-2xl p-5 shadow-luxury border border-sand-200 space-y-3">
        <h3 className="font-serif font-bold text-base text-charcoal-900 flex items-center justify-between">
          <span>Logged Expense Records</span>
          <span className="text-xs text-sand-500 font-sans font-normal">
            {expenses.length} transactions
          </span>
        </h3>

        <div className="divide-y divide-sand-100">
          {expenses.map(exp => (
            <div key={exp.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center font-bold text-charcoal-800">
                  ₹
                </div>
                <div>
                  <p className="font-bold text-charcoal-900">{exp.title}</p>
                  <p className="text-[11px] text-sand-500">
                    {exp.date} {exp.dayNumber ? `(Day ${exp.dayNumber})` : ''} · {exp.category.replace('_', ' ')}
                    {exp.notes && ` · ${exp.notes}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-charcoal-900">
                  ₹{exp.amount}
                </span>
                <button
                  onClick={() => handleDeleteExpense(exp.id)}
                  className="p-1 rounded-md text-sand-400 hover:text-rose-600 transition-colors"
                  title="Remove expense"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
