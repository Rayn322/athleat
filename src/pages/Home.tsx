import { ChevronRight, CircleUser } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";
import {
  useMeals,
  useSchedule,
  useSelectedDay,
} from "../utils/localStorageHooks";

export default function Home() {
  const navigate = useNavigate();
  const firstMealRef = useRef<HTMLButtonElement>(null);
  const [schedule] = useSchedule();
  const [meals] = useMeals();

  const [selectedDay, setSelectedDay] = useSelectedDay();
  const todayMeals = meals[selectedDay];

  // Scroll to the first meal item when the component mounts
  useEffect(() => {
    if (firstMealRef.current) {
      firstMealRef.current.scrollIntoView();
    }
  }, []);

  function addMeal(day: number, mealType: "breakfast" | "lunch" | "dinner") {
    navigate(`/MealOptions`, {
      state: { day, mealType },
    });
  }

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
          <CalendarDayList
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>

        {/* sorry */}
        {/* evil negative margin */}
        <div className="relative -mx-6 flex min-h-0 flex-col">
          <div className="border-t-2 border-t-light-gray" />
          <div className="min-h-0 overflow-y-auto">
            <DaySchedule>
              {todayMeals.breakfast ? (
                <MealCalItem
                  meal={todayMeals.breakfast}
                  day={selectedDay}
                  mealType="breakfast"
                  startHour={8}
                  ref={firstMealRef} // just pray that nothing is earlier lol
                />
              ) : (
                <AddCalItem
                  startHour={8}
                  ref={firstMealRef}
                  onClick={() => addMeal(selectedDay, "breakfast")}
                />
              )}
              {todayMeals.lunch ? (
                <MealCalItem
                  meal={todayMeals.lunch}
                  day={selectedDay}
                  mealType="lunch"
                  startHour={12}
                />
              ) : (
                <AddCalItem
                  startHour={12}
                  onClick={() => addMeal(selectedDay, "lunch")}
                />
              )}
              {todayMeals.dinner ? (
                <MealCalItem
                  meal={todayMeals.dinner}
                  day={selectedDay}
                  mealType="dinner"
                  startHour={18}
                />
              ) : (
                <AddCalItem
                  startHour={18}
                  onClick={() => addMeal(selectedDay, "dinner")}
                />
              )}
              {schedule.map((item) => {
                if (item.days.includes(selectedDay)) {
                  return (
                    <ClassCalItem
                      key={item.id}
                      name={item.name}
                      time={item.time}
                    />
                  );
                }
              })}
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
