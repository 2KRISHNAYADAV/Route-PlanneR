import { BudgetAllocation, BudgetCategory, Expense } from '../types/travel';

export const TOTAL_TRIP_BUDGET = 5000;

export const BUDGET_ALLOCATIONS: BudgetAllocation[] = [
  { category: 'train_to_udaipur', name: 'Vadodara to Udaipur Train', plannedAmount: 450, color: '#2A6F97', iconName: 'Train' },
  { category: 'train_return', name: 'Return Train to Vadodara', plannedAmount: 450, color: '#01497C', iconName: 'TrainTrack' },
  { category: 'hostel', name: 'Dreamyard Hostel (1 Night)', plannedAmount: 750, color: '#C59A45', iconName: 'Hotel' },
  { category: 'food', name: 'Food, Thalis, Snacks & Chai', plannedAmount: 1150, color: '#BC4749', iconName: 'Utensils' },
  { category: 'local_transport', name: 'Autos & Shuttles (Bahubali/Sajjangarh)', plannedAmount: 650, color: '#D97706', iconName: 'Car' },
  { category: 'sightseeing_tickets', name: 'Palace & Garden Entry Tickets', plannedAmount: 550, color: '#6A4C93', iconName: 'Ticket' },
  { category: 'boat_ride', name: 'Lake Pichola Boat Ride', plannedAmount: 400, color: '#4EA8DE', iconName: 'Ship' },
  { category: 'shopping', name: 'Souvenirs & Handicrafts', plannedAmount: 350, color: '#E07A5F', iconName: 'ShoppingBag' },
  { category: 'emergency_reserve', name: 'Contingency / Emergency Reserve', plannedAmount: 250, color: '#6C757D', iconName: 'ShieldAlert' }
];

const EXPENSES_STORAGE_KEY = 'udaipur_trip_expenses_v1';

// Initial pre-filled estimates or user expenses
export const INITIAL_SAMPLE_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    category: 'train_to_udaipur',
    amount: 420,
    title: 'Vadodara to Udaipur Express train ticket',
    date: '2026-11-23',
    notes: 'Sleeper class booked on IRCTC',
    dayNumber: 1
  },
  {
    id: 'exp-2',
    category: 'hostel',
    amount: 700,
    title: 'Dreamyard Udaipur 6-bed lakeview dorm advance',
    date: '2026-11-24',
    notes: '1 night stay with Pichola rooftop access',
    dayNumber: 1
  }
];

export function getStoredExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(EXPENSES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load expenses from localStorage:', e);
  }
  return INITIAL_SAMPLE_EXPENSES;
}

export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
  } catch (e) {
    console.warn('Failed to save expenses to localStorage:', e);
  }
}

export function addExpense(expense: Omit<Expense, 'id'>): Expense[] {
  const current = getStoredExpenses();
  const newExpense: Expense = {
    ...expense,
    id: `exp-${Date.now()}`
  };
  const updated = [newExpense, ...current];
  saveExpenses(updated);
  return updated;
}

export function deleteExpense(id: string): Expense[] {
  const current = getStoredExpenses();
  const updated = current.filter(e => e.id !== id);
  saveExpenses(updated);
  return updated;
}

export interface CategorySummary {
  category: BudgetCategory;
  name: string;
  planned: number;
  spent: number;
  difference: number;
  percentageUsed: number;
  color: string;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remainingMoney: number;
  percentageSpent: number;
  isExceeded: boolean;
  isWarning: boolean; // spent > 85%
  categories: CategorySummary[];
  day1Spent: number;
  day2Spent: number;
  otherSpent: number;
}

export function calculateBudgetSummary(expenses: Expense[]): BudgetSummary {
  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
  const remainingMoney = TOTAL_TRIP_BUDGET - totalSpent;
  const percentageSpent = Math.min(100, Math.round((totalSpent / TOTAL_TRIP_BUDGET) * 100));
  const isExceeded = totalSpent > TOTAL_TRIP_BUDGET;
  const isWarning = totalSpent >= TOTAL_TRIP_BUDGET * 0.85 && !isExceeded;

  const categories: CategorySummary[] = BUDGET_ALLOCATIONS.map(alloc => {
    const catSpent = expenses
      .filter(e => e.category === alloc.category)
      .reduce((acc, e) => acc + e.amount, 0);
    const diff = alloc.plannedAmount - catSpent;
    const percentage = Math.round((catSpent / (alloc.plannedAmount || 1)) * 100);

    return {
      category: alloc.category,
      name: alloc.name,
      planned: alloc.plannedAmount,
      spent: catSpent,
      difference: diff,
      percentageUsed: percentage,
      color: alloc.color
    };
  });

  const day1Spent = expenses
    .filter(e => e.dayNumber === 1 || e.date === '2026-11-24')
    .reduce((acc, e) => acc + e.amount, 0);

  const day2Spent = expenses
    .filter(e => e.dayNumber === 2 || e.date === '2026-11-25')
    .reduce((acc, e) => acc + e.amount, 0);

  const otherSpent = totalSpent - day1Spent - day2Spent;

  return {
    totalBudget: TOTAL_TRIP_BUDGET,
    totalSpent,
    remainingMoney,
    percentageSpent,
    isExceeded,
    isWarning,
    categories,
    day1Spent,
    day2Spent,
    otherSpent
  };
}
