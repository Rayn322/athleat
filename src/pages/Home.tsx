import { ChevronRight, CircleUser } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
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
        {/* evil negative margin */}
        <div className="relative -mx-6 flex min-h-0 flex-col">
          <div className="border-t-2 border-t-light-gray" />
          <div className="min-h-0 overflow-y-auto">
            <DaySchedule>
              <MealCalItem
                name="Bagel with Cream Cheese"
                startHour={8}
                completable
                ref={firstMealRef}
              />
              <MealCalItem name="Burger" startHour={12} completable />
              {schedule.map((item) => (
                <ClassCalItem key={item.id} name={item.name} time={item.time} />
              ))}
            </DaySchedule>
            <Button
              width="hug"
              icon={<ChevronRight />}
              showIcon
              iconPosition="right"
              className="absolute right-3 bottom-3"
              onClick={() => alert("Make this do something")}
            >
              plan next week
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
