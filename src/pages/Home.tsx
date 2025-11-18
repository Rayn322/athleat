import { CircleUser } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";
import { useSchedule } from "../utils/localStorageHooks";

export default function Home() {
  const navigate = useNavigate();
  const firstMealRef = useRef<HTMLButtonElement>(null);
  const [schedule] = useSchedule();

  // Scroll to the first meal item when the component mounts
  useEffect(() => {
    if (firstMealRef.current) {
      // scroll with some padding
      firstMealRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-8 pb-8">
          <div className="flex justify-between">
            <h2 className="text-base font-normal">Hello Sarah!</h2>
            <button type="button" onClick={() => navigate("/profile")}>
              <CircleUser className="h-6 w-6 text-black" />
            </button>
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
            <MealCalItem
              name="Bagel with Cream Cheese"
              startHour={8}
              completable
              ref={firstMealRef}
            />
            <MealCalItem name="Burger" startHour={12} completable />
            {schedule.map((item) => {
              return (
                <ClassCalItem key={item.id} name={item.name} time={item.time} />
              );
            })}
          </DaySchedule>
        </div>
      </div>
    </>
  );
}
