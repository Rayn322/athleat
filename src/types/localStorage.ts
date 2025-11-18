export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Event {
  id: string;
  name: string;
  days: boolean[]; // array of 7, bool for each day
  startTime: string;
  endTime: string;
}

export type Calendar = Event[];

// add nutrition details if we have time
export interface Meal {
  name: string;
  calories: number;
  groceries: string[];
}

// since we aren't scheduling meals, heres 3 slots I guess
export interface DayOfMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}
