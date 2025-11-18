import { useLocalStorage } from "@uidotdev/usehooks";
import type { ScheduleItem } from "../types/localStorage";

export function useSchedule() {
  return useLocalStorage<ScheduleItem[]>("athleat:schedule", []);
}
