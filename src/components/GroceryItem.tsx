import React from "react";
import { Checkbox } from "./Checkbox";
import { Trash } from "lucide-react";


export type GroceryItemProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onRemove?: () => void;
  className?: string;
};

export function GroceryItem({
  label,
  checked = false,
  onChange,
  onRemove,
  className,
}: GroceryItemProps) {
  return (
    <div
      className={[
        "flex w-full items-center gap-4 rounded-2xl border-2 p-3 transition-all sm:p-5",
        checked
          ? "border-green-primary shadow-[0_0_0_4px_rgba(32,159,45,0.35)]"
          : "border-light-gray",
        "bg-transparent select-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Checkbox (controlled) */}
      <Checkbox checked={checked} onCheckedChange={onChange} />

      {/* Label */}
      <span className="text-base flex-1">{label}</span>

      {/* Trash button */}
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        className="p-2 rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors"
      >
        <Trash className="h-5 w-5" />
      </button>
    </div>
  );
}
