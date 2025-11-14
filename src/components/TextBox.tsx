import React from "react";
import clsx from "clsx";

type Variant = "filled" | "unfilled";

export type TextBoxProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: Variant;
  className?: string;
};

export function TextBox({
  label,
  placeholder = "",
  value = "",
  onChange,
  variant = "unfilled",
  className,
}: TextBoxProps) {
  return (
    <div className={clsx("inline-flex w-80 flex-col gap-2", className)}>
      <label className="text-base font-normal text-dark-gray">{label}</label>

      <div
        className={clsx(
          "inline-flex items-center self-stretch rounded-xl p-4 outline -outline-offset-2",
          "outline-light-gray",
          variant === "filled" ? "bg-transparent" : "bg-transparent",
        )}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            "flex-1 bg-transparent text-base font-normal placeholder:italic focus:outline-none",
            value ? "text-black" : "text-dark-gray placeholder-dark-gray",
          )}
        />
      </div>
    </div>
  );
}
