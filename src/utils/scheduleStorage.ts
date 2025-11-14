// src/utils/scheduleStorage.ts
// src/utils/scheduleStorage.ts
import type { ScheduleItem } from "../types/schedule.ts";

const STORAGE_KEY = "athleat_schedule";

export function loadSchedule(): ScheduleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ScheduleItem[];
  } catch (e) {
    console.error("Failed to load schedule", e);
    return [];
  }
}

export function saveSchedule(items: ScheduleItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save schedule", e);
  }
}

export function addScheduleItem(item: ScheduleItem) {
  const items = loadSchedule();
  items.push(item);
  saveSchedule(items);
}

export function removeScheduleItem(id: string) {
  const items = loadSchedule();
  saveSchedule(items.filter((i) => i.id !== id));
}

export function updateScheduleItem(updated: ScheduleItem) {
  const items = loadSchedule();
  const idx = items.findIndex((i) => i.id === updated.id);
  if (idx !== -1) items[idx] = updated;
  saveSchedule(items);
}
