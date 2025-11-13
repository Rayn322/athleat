// src/pages/Groceries1.tsx
import { useNavigate } from "react-router-dom";
import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar2";

export default function Groceries1() {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/MealOptions", { state: { next: "/Groceries2" } });
  };

  return (
    <div className="flex h-full flex-col">
      <div>
        <p className="text-2xl font-bold">groceries</p>
        <div className="text-sm text-black/70 text-right mt-2">0 of 7 days planned</div>
        <div className="w-full h-2 rounded-full bg-neutral-200 mt-2 mb-4">
          <div className="h-2 rounded-full bg-black" style={{ width: "0%" }} />
        </div>
        <div className="mt-3">
          <CalendarDayList />
        </div>
      </div>

      <div className="-mx-6 overflow-y-auto">
        <DaySchedule>
          <MealCalItem name="Bagel with Cream Cheese" startHour={8} />
          {/* If AddCalItem doesn't accept onClick, wrap it: */}
          <div onClick={handleAdd} role="button" aria-label="Add meal">
            <AddCalItem startHour={11} />
          </div>
          <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
        </DaySchedule>
      </div>
    </div>
  );
}
