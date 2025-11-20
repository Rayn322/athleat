import { useLocalStorage } from "@uidotdev/usehooks";
import type { DayOfMeals, ScheduleItem, User } from "../types/localStorage";

export function useSchedule() {
  return useLocalStorage<ScheduleItem[]>("athleat:schedule", []);
}

export function useUser() {
  return useLocalStorage<User | null>("athleat:user", null);
}

// all meals null for the week
function createInitialMeals() {
  const initialMeals: DayOfMeals[] = [];
  for (let i = 0; i < 7; i++) {
    initialMeals.push({
      breakfast: null,
      lunch: null,
      dinner: null,
    });
  }
  return initialMeals;
}

const initialMeals = createInitialMeals();

export function useMeals() {
  return useLocalStorage<DayOfMeals[]>("athleat:meals", initialMeals);
}
