import clsx from "clsx";

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
        className={clsx({
          "flex aspect-square items-center px-2.5 py-1.5": true,
          "text-black": !selected,
          "rounded-full bg-black text-white": selected,
        })}
      >
        {dayNumber}
      </p>
    </button>
  );
}

export default function Calendar() {
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
