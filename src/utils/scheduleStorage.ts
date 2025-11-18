// src/utils/scheduleStorage.ts
import type { ScheduleItem } from "../types/localStorage.ts";

export function addScheduleItem(
  item: ScheduleItem,
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleItem[]>>,
) {
  setSchedule((prev) => [...prev, item]);
}

export function removeScheduleItem(
  id: string,
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleItem[]>>,
) {
  setSchedule((prev) => prev.filter((i) => i.id !== id));
}

export function updateScheduleItem(
  updated: ScheduleItem,
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleItem[]>>,
) {
  setSchedule((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
}
