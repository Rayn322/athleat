// components/MealOption.tsx
import React from "react";
import clsx from "clsx";

export type MealOptionProps = {
  title: string;
  imageSrc: string;
  /** e.g. ["high protein", "carbs"] */
  tags?: string[];
  /** e.g. ["Bread", "Patty", "Lettuce", ...] */
  ingredients?: string[];
  /** green border + glow when true */
  selected?: boolean;
  /** click/keyboard handler */
  onSelect?: () => void;
  className?: string;
};

export function MealOption({
  title,
  imageSrc,
  tags = [],
  ingredients = [],
  selected = false,
  onSelect,
  className,
}: MealOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={clsx(
        // layout
        "w-full text-left flex items-center gap-6 p-6 sm:p-7",
        "rounded-[28px] transition-all",
        // border + glow states
        "border-2",
        selected
          ? "border-green-500 shadow-[0_0_0_6px_rgba(34,197,94,0.35)]"
          : "border-neutral-300",
        // background stays transparent to match your page bg
        "bg-transparent",
        // focus ring for a11y
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500",
        className
      )}
    >
      {/* image */}
      <img
        src={imageSrc}
        alt=""
        className="h-28 w-28 shrink-0 rounded-2xl object-cover"
      />

      {/* content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-3xl sm:text-5xl font-medium leading-tight">
          {title}
        </h3>

        {/* tags / chips */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {tags.map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full px-4 py-1 text-lg font-medium bg-black text-white"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ingredients with bullets */}
        {ingredients.length > 0 && (
          <div className="mt-4 text-xl sm:text-2xl text-current/90">
            {ingredients.map((ing, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="mx-2">•</span>}
                <span>{ing}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
