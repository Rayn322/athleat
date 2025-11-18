import { useLocalStorage } from "@uidotdev/usehooks";
import type { ScheduleItem, User } from "../types/localStorage";

export function useSchedule() {
  return useLocalStorage<ScheduleItem[]>("athleat:schedule", []);
}

export function useUser() {
  return useLocalStorage<User | null>("athleat:user", null);
}
