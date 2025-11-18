export interface User {
  username: string;
  email: string;
  password: string;
}

export interface ScheduleItem {
  id: string;
  type: "class" | "practice" | "event";
  name: string;
  recurring: boolean;
  sameTimeDaily: boolean;
  days: string[];
  frequency: "weekly" | "biweekly" | "monthly";
  time: {
    start: string;
    end: string;
  };
  startDate: string;
  endDate: string;
}

export type Calendar = ScheduleItem[];

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
