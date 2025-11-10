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
        "flex items-center gap-4 w-full p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer",
        checked
          ? "border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]"
          : "border-neutral-300",
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
        className="appearance-none h-6 w-6 rounded border-2 border-black checked:bg-green-500 checked:border-green-500 transition-colors"
      />
      <span className="text-2xl font-medium">{label}</span>
    </label>
  );
}
