import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <div>
        {/* Title */}
        <p className="text-2xl font-bold">groceries</p>

        {/* Planned summary */}
        <div className="text-sm text-black/70 text-right mt-2">
          0 of 7 days planned
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-neutral-200 mt-2 mb-4">
          <div className="h-2 rounded-full bg-black" style={{ width: "0%" }} />
        </div>

        {/* Weekdays list — added top margin for extra space below bar */}
        <div className="mt-3">
          <CalendarDayList />
        </div>
      </div>

      {/* Keep schedule area spacing the same */}
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
