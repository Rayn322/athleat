import { CircleUser } from "lucide-react";
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
      <div className="flex flex-col gap-8 pb-8">
        <div className="flex justify-between">
          <h2 className="text-base font-normal">Hello Sarah!</h2>
          <CircleUser />
        </div>
        <h1 className="text-2xl font-normal">today's meals</h1>
        <CalendarDayList />
      </div>
      {/* sorry */}
      <div className="-mx-6 border-t-2 border-t-light-gray"></div>
      {/* evil negative margin */}
      {/* either make this a variable later or pay close attention to the layout's padding */}
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
