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
  days: number[]; // 0 (Sun) to 6 (Sat)
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
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}
