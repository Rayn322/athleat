import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";
import { useNavigate } from "react-router";

export default function Groceries4() {
  // Static mock to match the screenshot
  const plannedDays = 7;
  const TOTAL_DAYS = 7;
  const percent = 100; // full bar
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full flex-col">
      <div>
        {/* Title */}
        <p className="text-2xl font-bold">groceries</p>

        {/* Progress row: bar (left) + label (right) */}
        <div className="mt-2 flex items-center gap-3">
          <div className="h-3 w-full rounded-full bg-light-gray">
            <div
              className="h-3 rounded-full bg-green-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-sm whitespace-nowrap text-black/70">
            {plannedDays} of {TOTAL_DAYS} days planned
          </div>
        </div>

        {/* Weekdays header */}
        <div className="mt-3">
          <CalendarDayList />
        </div>
      </div>

      {/* Schedule area (spacing unchanged) */}
      <div className="-mx-6 overflow-y-auto">
        <DaySchedule>
          <MealCalItem name="bagel with cream cheese" startHour={8} />
          <MealCalItem name="salmon" startHour={11} />
          <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
        </DaySchedule>
      </div>

      {/* Floating pill button */}
      <button
<<<<<<< HEAD
        onClick={() => navigate("/groceryList")}
        className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-green-primary text-white px-5 py-3 font-semibold shadow-lg"
=======
        onClick={() => console.log("generate grocery list")}
        className="absolute right-6 bottom-6 flex items-center gap-2 rounded-full bg-green-primary px-5 py-3 font-semibold text-white shadow-lg"
>>>>>>> origin/main
        aria-label="Generate grocery list"
      >
        <span>generate grocery list</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
