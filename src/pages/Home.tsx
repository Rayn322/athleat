import { CircleUser } from "lucide-react";
import {
  AddCalItem,
  CalendarDayList,
  ClassCalItem,
  DaySchedule,
  MealCalItem,
} from "../components/Calendar";
import { useState } from "react";
import MealModal from "../components/MealModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bagelCompleted, setBagelCompleted] = useState(false);

  return (
    <>
      {modalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false); // only background
          }}
          className="fixed top-0 left-0 z-51 flex size-full items-center justify-center bg-gray-60 px-6 backdrop-blur-[2.70px]"
        >
          <MealModal
            name="Bagel with Cream Cheese"
            calories={371}
            tags={[
              { label: "protein", emphasized: true },
              { label: "fats" },
              { label: "carbs" },
            ]}
            onClose={() => setModalOpen(false)}
            onMarkCompleted={() => setBagelCompleted(true)}
            onMarkIncomplete={() => setBagelCompleted(false)}
            completed={bagelCompleted}
          />
        </div>
      )}
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
            {/* TODO: replace with some sort of state from the week planning */}
            <MealCalItem
              name="Bagel with Cream Cheese"
              startHour={8}
              completed={bagelCompleted}
              onClick={() => setModalOpen(true)} // needs state
            />
            <AddCalItem startHour={11} />
            <ClassCalItem name="CSC 321" startHour={12} lengthInHours={2} />
          </DaySchedule>
        </div>
      </div>
    </>
  );
}
