import React from "react";

type TagVariant =
  | "outline-green"
  | "green"
  | "outline-black"
  | "outline"
  | "black"
  | "white";
type TagSize = "lg" | "sm";

export type TagProps = {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
};

export function Tag({
  label,
  variant = "outline-green",
  size = "lg",
  className = "",
}: TagProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all";
  const sizeClasses =
    size === "lg" ? "px-2 py-1 text-small" : "px-2 py-1 text-tiny";

  const variantClasses = {
    "outline-green":
      "border-2 border-green-primary text-green-primary bg-transparent",
    green: "bg-green-primary text-white",
    "outline-black": "border-2 border-black text-black bg-transparent",
    outline: "border-2 border-bg-white text-white bg-transparent",
    black: "bg-black text-white",
    white: "bg-white text-black",
  }[variant];

  return (
    <span className={`${base} ${sizeClasses} ${variantClasses} ${className}`}>
      {label}
    </span>
  );
}
