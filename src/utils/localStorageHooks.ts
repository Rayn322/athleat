import { useLocalStorage, useSessionStorage } from "@uidotdev/usehooks";
import type { DayOfMeals, ScheduleItem, User, Grocery } from "../types/localStorage";

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

export function useSelectedDay() {
  const today = new Date().getDay();
  return useSessionStorage<number>("athleat:selectedDay", today);
}

export function useGroceries() {
  return useLocalStorage<Grocery[]>("athleat:groceries", []);
}

export function useQuickProteinSelections() {
  return useLocalStorage<Record<string, boolean>>(
    "athleat:quickadd:proteins:selected",
    {}
  );
}

export function useSuppressedGroceries() {
  // store normalized labels the user deleted
  return useLocalStorage<string[]>("athleat:groceries:suppressed", []);
}