// src/pages/Groceries2.tsx
import { useNavigate } from "react-router-dom";
import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar2";

export default function Groceries2() {
  const plannedDays = 1;
  const TOTAL_DAYS = 7;
  const percent = Math.round((plannedDays / TOTAL_DAYS) * 100);
  const navigate = useNavigate();

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
          <MealCalItem name="Cheese Burger" startHour={11} />
          <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
        </DaySchedule>
      </div>

      <button
        onClick={() => navigate("/Groceries3")}
        className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-green-primary text-white px-5 py-3 font-semibold shadow-lg"
      >
        <span>next day</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
