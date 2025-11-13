import {
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";

export default function Home() {
  // Static mock for the header
  const plannedDays = 1;
  const TOTAL_DAYS = 7;
  const percent = Math.min(100, Math.round((plannedDays / TOTAL_DAYS) * 100));

  return (
    <div className="flex h-full flex-col relative">
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
          <div className="text-sm text-black/70 whitespace-nowrap">
            {plannedDays} of {TOTAL_DAYS} days planned
          </div>
        </div>

        {/* Weekdays header (no props; static) */}
        <div className="mt-3">
          <CalendarDayList />
        </div>
      </div>

      {/* Schedule area (kept exactly as before) */}
      <div className="-mx-6 overflow-y-auto">
        <DaySchedule>
          <MealCalItem name="Bagel with Cream Cheese" startHour={8} />
          <MealCalItem name="Turkey Sandwich" startHour={11} />
          <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
        </DaySchedule>
      </div>

      {/* Floating Next Day button */}
      <button
        onClick={() => console.log("Next Day")}
        className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-green-primary text-white px-5 py-3 font-semibold shadow-lg"
        aria-label="Next day"
      >
        <span>next day</span>
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
