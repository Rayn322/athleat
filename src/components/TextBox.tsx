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
    <div className={clsx("w-80 inline-flex flex-col gap-2", className)}>
      <label className="text-dark-gray text-base font-normal">{label}</label>

      <div
        className={clsx(
          "self-stretch p-4 rounded-xl outline outline-2 outline-offset-[-2px] inline-flex items-center",
          "outline-light-gray",
          variant === "filled" ? "bg-transparent" : "bg-transparent"
        )}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            "flex-1 bg-transparent text-base font-normal focus:outline-none placeholder:italic",
            value ? "text-black" : "text-dark-gray placeholder-dark-gray"
        )}

        />
      </div>
    </div>
  );
}
