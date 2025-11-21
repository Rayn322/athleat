import type { CardData } from "../components/SwipeCard";

export interface User {
  firstName: string;
  lastName: string;
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

export interface UserMetrics {
  dietaryGoal: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  weightUnit: string;
  gender: string;
  age: string;
  sport: string;
  foodRestrictions: string[];
  shareProgress: boolean;
  college?: string;
  profilePic?: string | null;
}

export interface UserPreferences {
  likedMeals: CardData[];
  dislikedMeals: CardData[];
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
