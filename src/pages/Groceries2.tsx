import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";

export default function Home() {
  // For the mock: 1 of 7 planned (adjust later if you compute this)
  const plannedDays = 1;
  const TOTAL_DAYS = 7;
  const percent = Math.min(100, Math.round((plannedDays / TOTAL_DAYS) * 100));

  return (
    <div className="flex h-full flex-col">
      <div>
        {/* Title */}
        <p className="text-2xl font-bold">groceries</p>

        {/* Progress row: bar (left) + label (right) */}
        <div className="mt-2 flex items-center gap-3">
          {/* Track */}
          <div className="h-3 w-full rounded-full bg-light-gray">
            {/* Fill */}
            <div
              className="h-3 rounded-full bg-green-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          {/* Label */}
          <div className="text-sm text-black/70 whitespace-nowrap">
            {plannedDays} of {TOTAL_DAYS} days planned
          </div>
        </div>

        {/* Weekdays header with a little spacing below the bar */}
        <div className="mt-3">
          <CalendarDayList />
        </div>
      </div>

      {/* Keep schedule spacing exactly as you had it */}
      <div className="-mx-6 overflow-y-auto">
        <DaySchedule>
          <MealCalItem name="Bagel with Cream Cheese" startHour={8} />
          <AddCalItem startHour={11} />
          <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
        </DaySchedule>
      </div>
    </div>
  );
}
