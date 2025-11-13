import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";
import MealModal from "../components/MealModal";

export default function Other() {
  return (
    <div>
      <p>This is another page</p>
      <Link
        to="/"
        className="flex w-fit gap-2 rounded-3xl bg-green-primary px-4 py-3 text-white"
      >
        <span>Back to main page</span>
        <ChevronRight />
      </Link>

      {/* temp background so you can see the modal better */}
      <div className="bg-bg-white p-4">
        <MealModal
          name="Bagel with Cream Cheese"
          calories={371}
          tags={[
            { label: "protein", emphasized: true },
            { label: "fats" },
            { label: "carbs" },
          ]}
        />
      </div>

      <CalendarDayList />
      <DaySchedule>
        <MealCalItem name="Bagel with Cream Cheese" startHour={8} />
        <AddCalItem startHour={11} />
        <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
      </DaySchedule>
    </div>
  );
}
