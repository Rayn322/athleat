// src/pages/Groceries3.tsx
import { useNavigate } from "react-router";
import {
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
  AddCalItem,
} from "../components/Calendar";

export default function Groceries3() {
  const plannedDays = 1;
  const TOTAL_DAYS = 7;
  const percent = Math.round((plannedDays / TOTAL_DAYS) * 100);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/MealOptions", { state: { next: "/Groceries4" } });
  };

  return (
    <div className="flex h-full flex-col relative">
      <div>
        <p className="text-2xl font-bold">groceries</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-3 w-full rounded-full bg-light-gray">
            <div className="h-3 rounded-full bg-green-primary" style={{ width: `${percent}%` }} />
          </div>
          <div className="text-sm text-black/70 whitespace-nowrap">
            {plannedDays} of {TOTAL_DAYS} days planned
          </div>
        </div>
        <div className="mt-3">
          <CalendarDayList />
        </div>
      </div>

      <div className="-mx-6 overflow-y-auto">
        <DaySchedule>
          <MealCalItem name="Bagel with Cream Cheese" startHour={8} />
          {/* Wrap AddCalItem so a click navigates */}
          <div onClick={handleAdd} role="button" aria-label="Add meal at 11 AM">
            <AddCalItem startHour={11} />
          </div>
          <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
        </DaySchedule>
      </div>
    </div>
  );
}
