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
        <p className="text-2xl font-bold">BIG FAT TITLE</p>
        <CalendarDayList />
      </div>
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
