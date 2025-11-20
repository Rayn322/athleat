import React, { useState } from "react";
import clsx from "clsx";
import { Tag } from "../components/Tag";

export type MealOptionProps = {
  title: string;
  imageSrc: string;
  tags?: string[];
  ingredients?: string[];
  selected?: boolean; // controlled
  onSelect?: (selected: boolean) => void;
  className?: string;
  showImage?: boolean; // for swipe cards (preferences)
};

export function MealOption({
  title,
  imageSrc,
  tags = [],
  ingredients = [],
  selected: controlledSelected,
  onSelect,
  className,
  showImage = true,
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
        "flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all",
        selected
          ? "border-green-primary shadow-[0_0_0_6px_rgba(32,159,45,0.35)]"
          : "border-light-gray",
        "bg-transparent",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      {/* image */}
      {showImage !== false && (
        <img
          src={imageSrc}
          alt={title}
          className="h-20 w-20 shrink-0 rounded-2xl object-cover"
        />
      )}

      {/* content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-base">
          {title}
        </h3>

        {/* tags */}
        {tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.map((t) => (
              <Tag
                key={t}
                label={t}
                size="sm" 
                variant="black"
              />
            ))}
          </div>
        )}

        {/* ingredients */}
        {ingredients.length > 0 && (
          <div className="mt-1 text-tiny text-current/90">
            {ingredients.map((ing, i) => (
              <React.Fragment key={ing}>
                {i > 0 && <span className="mx-1">•</span>}
                <span>{ing}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
