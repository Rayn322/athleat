import clsx from "clsx";
import { ChevronRight, Plus } from "lucide-react";
import type { PropsWithChildren } from "react";

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
      className="flex w-fit flex-col items-center justify-center gap-1 text-small font-medium"
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
        className={clsx("flex aspect-square items-center px-2.5 py-1.5", {
          "text-black": !selected,
          "rounded-full bg-black text-white": selected,
        })}
      >
        {dayNumber}
      </p>
    </button>
  );
}

export function CalendarDayList() {
  return (
    <div className="flex items-center justify-between">
      {/* month is zero indexed */}
      <CalendarDay date={new Date(2025, 10, 10)} />
      <CalendarDay date={new Date(2025, 10, 11)} selected />
      <CalendarDay date={new Date(2025, 10, 12)} />
      <CalendarDay date={new Date(2025, 10, 13)} />
      <CalendarDay date={new Date(2025, 10, 14)} />
      <CalendarDay date={new Date(2025, 10, 15)} />
      <CalendarDay date={new Date(2025, 10, 16)} />
    </div>
  );
}

export function DaySchedule({ children }: PropsWithChildren) {
  // evil negative margin
  // either make this a variable later or pay close attention to the layout's padding
  return (
    <div className="relative -mx-4 bg-bg-white">
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
  const hourLabel =
    hour === 0
      ? "12 AM"
      : hour < 12
        ? `${hour} AM`
        : hour === 12
          ? "12 PM"
          : `${hour - 12} PM`;

  return (
    // make pt 11px so the border adds the 12th pixel lol
    <div className="border-t border-t-light-gray pt-2.75 pr-2.5 pb-15 pl-6">
      <p className="text-small font-medium">{hourLabel}</p>
    </div>
  );
}

export function ClassCalItem({
  startHour,
  lengthInHours,
}: {
  startHour: number;
  lengthInHours: number;
}) {
  return (
    <div
      className="absolute inset-x-0 mr-6 ml-22 space-y-1 rounded-xl bg-green-secondary p-3"
      style={{
        top: `calc(${(startHour / 24) * 100}% + 1px)`,
        height: `calc(${(lengthInHours / 24) * 100}% - 1px)`,
      }}
    >
      <p className="text-base font-bold">CSC 321</p>
      <p className="text-small font-medium">12 PM - 2 PM</p>
    </div>
  );
}

export function MealCalItem({
  name,
  startHour,
  onClick,
}: {
  name: string;
  startHour: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute inset-x-0 mr-6 ml-22 flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border-2 border-black bg-white p-2.5"
      style={{ top: `calc(${(startHour / 24) * 100}% + 1px)` }}
    >
      <span className="text-base font-normal">{name}</span>
      <ChevronRight />
    </button>
  );
}

export function AddCalItem({
  startHour,
  onClick,
}: {
  startHour: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute inset-x-0 mr-6 ml-22 flex cursor-pointer items-center justify-center rounded-xl bg-green-primary p-2.5 text-white"
      style={{ top: `calc(${(startHour / 24) * 100}% + 1px)` }}
    >
      <Plus />
    </button>
  );
}
