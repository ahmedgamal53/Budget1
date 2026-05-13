// Storage helpers for BudgetPilot app
export const STORAGE_KEY = "budget_app_v1";

export const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
};

export const save = (state) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

export const INITIAL_STATE = {
  user: null,
  budget: null,
  transactions: [],
};

export const CATEGORIES = {
  expense: [
    "Food",
    "Transport",
    "Housing",
    "Health",
    "Entertainment",
    "Shopping",
    "Education",
    "Other",
  ],
  income: ["Salary", "Freelance", "Gift", "Investment", "Other"],
};
