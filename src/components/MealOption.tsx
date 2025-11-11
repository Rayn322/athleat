import React, { useState } from "react";
import clsx from "clsx";

export type MealOptionProps = {
  title: string;
  imageSrc: string;
  tags?: string[];
  ingredients?: string[];
  selected?: boolean; // controlled
  onSelect?: (selected: boolean) => void;
  className?: string;
};

export function MealOption({
  title,
  imageSrc,
  tags = [],
  ingredients = [],
  selected: controlledSelected,
  onSelect,
  className,
}: MealOptionProps) {
  const [internalSelected, setInternalSelected] = useState(false);
  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;

  const handleClick = () => {
    const next = !selected;
    if (!isControlled) setInternalSelected(next);
    onSelect?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      className={clsx(
        "w-full text-left flex items-center gap-6 p-6 sm:p-7 rounded-[28px] transition-all border-2",
        selected
          ? "border-green-primary shadow-[0_0_0_6px_rgba(32,159,45,0.35)]"
          : "border-light-gray",
        "bg-transparent",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-primary",
        className
      )}
    >
      {/* image */}
      <img
        src={imageSrc}
        alt={title}
        className="h-28 w-28 shrink-0 rounded-2xl object-cover"
      />

      {/* content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-3xl sm:text-5xl font-medium leading-tight">
          {title}
        </h3>

        {/* tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full px-4 py-1 text-lg font-medium bg-black text-bg-white"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ingredients */}
        {ingredients.length > 0 && (
          <div className="mt-4 text-xl sm:text-2xl text-current/90">
            {ingredients.map((ing, i) => (
              <React.Fragment key={ing}>
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
