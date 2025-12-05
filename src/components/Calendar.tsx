import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import type { Meal, ScheduleItem } from "../types/localStorage";
import { useMeals } from "../utils/localStorageHooks";
import MealModal from "./MealModal";

function CalendarDay({
  date,
  selected = false,
  onClick,
}: {
  date: Date;
  selected?: boolean;
  onClick?: () => void;
}) {
  const dayLetter = date
    .toLocaleDateString("en-US", {
      weekday: "short",
    })
    .charAt(0);
  const dayNumber = date.getDate();

  return (
    <button
      onClick={onClick}
      className="flex w-fit cursor-pointer flex-col items-center justify-center gap-1 text-small font-medium"
    >
      <p
        className={clsx({
          "text-dark-gray": !selected,
          "text-black": selected,
        })}
      >
        {dayLetter}
      </p>
      <p
        className={clsx(
          "flex aspect-square items-center justify-center px-2.5 py-1.5",
          {
            "text-black": !selected,
            "rounded-full bg-black text-white": selected,
          },
        )}
      >
        {dayNumber}
      </p>
    </button>
  );
}

export function CalendarDayList({
  selectedDay,
  onSelectDay,
}: {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <div className="flex items-center justify-between">
      {days.map((date) => (
        <CalendarDay
          key={date.toDateString()}
          date={date}
          selected={date.getDay() === selectedDay}
          onClick={() => onSelectDay(date.getDay())}
        />
      ))}
    </div>
  );
}

/**
 * Pass in {@link ClassCalItem}, {@link MealCalItem}, and/or {@link AddCalItem} as children
 */
export function DaySchedule({ children }: PropsWithChildren) {
  return (
    <div className="relative bg-bg-white">
      {children}
      <HourSlot hour={0} />
      <HourSlot hour={1} />
      <HourSlot hour={2} />
      <HourSlot hour={3} />
      <HourSlot hour={4} />
      <HourSlot hour={5} />
      <HourSlot hour={6} />
      <HourSlot hour={7} />
      <HourSlot hour={8} />
      <HourSlot hour={9} />
      <HourSlot hour={10} />
      <HourSlot hour={11} />
      <HourSlot hour={12} />
      <HourSlot hour={13} />
      <HourSlot hour={14} />
      <HourSlot hour={15} />
      <HourSlot hour={16} />
      <HourSlot hour={17} />
      <HourSlot hour={18} />
      <HourSlot hour={19} />
      <HourSlot hour={20} />
      <HourSlot hour={21} />
      <HourSlot hour={22} />
      <HourSlot hour={23} />
    </div>
  );
}

function HourSlot({ hour = 8 }: { hour?: number }) {
  return (
    // make pt 11px so the border adds the 12th pixel lol
    <div className="border-t border-t-light-gray pt-2.75 pr-2.5 pb-15 pl-6">
      <p className="text-small font-medium">{hourToTimeString(hour)}</p>
    </div>
  );
}

export function ClassCalItem({
  name,
  time,
}: {
  name: string;
  time: ScheduleItem["time"];
}) {
  const [startHour, startMinute] = time.start.split(":").map(Number);
  const [endHour, endMinute] = time.end.split(":").map(Number);

  const startHourFloat = startHour + startMinute / 60;
  const endHourFloat = endHour + endMinute / 60;
  const lengthInHours = endHourFloat - startHourFloat;

  const timeRange = `${convertToTimeString(
    startHour,
    startMinute,
  )} - ${convertToTimeString(endHour, endMinute)}`;

  return (
    <div
      className="absolute inset-x-0 mr-6 ml-22 space-y-1 rounded-xl bg-green-secondary p-3"
      style={{
        top: `calc(${(startHourFloat / 24) * 100}% + 1px)`,
        height: `calc(${(lengthInHours / 24) * 100}% - 1px)`,
      }}
    >
      <p className="text-base font-bold">{name}</p>
      <p className="text-small font-medium">{timeRange}</p>
    </div>
  );
}

export function MealCalItem({
  meal,
  day,
  mealType,
  startHour,
  ref,
}: {
  meal: Meal;
  day: number;
  mealType: "breakfast" | "lunch" | "dinner";
  startHour: number;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [, setMeals] = useMeals();

  function setCompleted(completed: boolean) {
    setMeals((prevMeals) => {
      const newMeals = [...prevMeals];
      newMeals[day] = {
        ...newMeals[day],
        [mealType]: {
          ...newMeals[day][mealType],
          completed,
        },
      };
      return newMeals;
    });
  }

  function onEdit() {
    navigate(`/MealOptions`, {
      state: { day, mealType },
    });
  }

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
            name={meal.name}
            calories={meal.calories}
            tags={meal.tags.map((tag) => ({
              label: tag,
              emphasized: tag.includes("high"),
            }))}
            onClose={() => setModalOpen(false)}
            onMarkCompleted={() => setCompleted(true)}
            onMarkIncomplete={() => setCompleted(false)}
            onEdit={onEdit}
            completed={meal.completed}
          />
        </div>
      )}
      <button
        ref={ref}
        onClick={() => setModalOpen(true)}
        className="absolute inset-x-0 mr-6 ml-22 flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border-2 border-black bg-white p-2.5"
        style={{ top: `calc(${(startHour / 24) * 100}% + 1px)` }}
      >
        <span
          className={clsx("text-base font-normal", {
            "line-through": meal.completed,
          })}
        >
          {meal.name}
        </span>
        <ChevronRight />
      </button>
    </>
  );
}

export function AddCalItem({
  startHour,
  onClick,
  ref,
}: {
  startHour: number;
  onClick?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="absolute inset-x-0 mr-6 ml-22 flex cursor-pointer items-center justify-center rounded-xl bg-green-primary p-2.5 text-white"
      style={{ top: `calc(${(startHour / 24) * 100}% + 1px)` }}
    >
      add meal
    </button>
  );
}

function convertToTimeString(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const minutePadded = minute.toString().padStart(2, "0");
  return `${hour12}:${minutePadded} ${period}`;
}

function hourToTimeString(hour: number) {
  return hour === 0
    ? "12 AM"
    : hour < 12
      ? `${hour} AM`
      : hour === 12
        ? "12 PM"
        : `${hour - 12} PM`;
}
