import React from "react";

export type GroceryItemProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export function GroceryItem({
  label,
  checked = false,
  onChange,
  className,
}: GroceryItemProps) {
  return (
    <label
      className={[
        "flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all sm:p-5",
        checked
          ? "border-green-primary shadow-[0_0_0_4px_rgba(32,159,45,0.35)]"
          : "border-light-gray",
        "bg-transparent select-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-6 w-6 appearance-none rounded border-2 border-black transition-colors checked:border-green-primary checked:bg-green-primary"
      />
      <span className="text-2xl font-medium">{label}</span>
    </label>
  );
}
