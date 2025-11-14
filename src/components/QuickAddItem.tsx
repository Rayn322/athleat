// src/components/QuickAddItem.tsx

import * as React from "react";
import { CirclePlus, CheckCircle2 } from "lucide-react";

export type QuickAddItemProps = {
  name: string;
  imageSrc: string;
  imageAlt?: string;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (next: boolean) => void;
  onAdd?: () => void;
  className?: string;
};

export function QuickAddItem({
  name,
  imageSrc,
  imageAlt,
  selected,
  defaultSelected = false,
  onSelectedChange,
  onAdd,
  className,
}: QuickAddItemProps) {
  const [internal, setInternal] = React.useState(defaultSelected);
  const isControlled = selected !== undefined;
  const isSelected = isControlled ? !!selected : internal;

  function toggle() {
    const next = !isSelected;
    if (!isControlled) setInternal(next);
    onSelectedChange?.(next);
  }

  return (
    <button
      type="button"
      onClick={() => {
        const next = !isSelected;
        if (!isControlled) setInternal(next);
        onSelectedChange?.(next);
        if (next) onAdd?.(); // only fire when selecting; or just call onAdd?.() if you want every click
      }}
      aria-pressed={isSelected}
      className={[
        "w-full text-left p-4 space-y-2 rounded-[24px] transition-all",
        // background + text
        "bg-white text-black",
        // border 2px light gray by default
        "border-2",
        isSelected
          ? "border-green-primary ring-4 ring-green-primary/35"
          : "border-light-gray",
        // hover/active polish
        "hover:shadow-sm active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-primary/45",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-h2">
          {name}
        </span>

        {isSelected ? (
          <CheckCircle2
            className="h-6 w-6 text-green-primary"
            aria-hidden
          />
        ) : (
          <CirclePlus className="h-6 w-6 text-black" />
        )}
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-[12px] border border-light-gray/80">
        <img
          src={imageSrc}
          alt={imageAlt || name}
          className="block h-36 w-full object-cover"
          draggable={false}
        />
      </div>
    </button>
  );
}
