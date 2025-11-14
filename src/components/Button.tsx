// src/components/Button.tsx
import * as React from "react";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

type Variant = "primary" | "outline" | "disabled";
type Size = "lg" | "md" | "sm";
type Width = "full" | "hug";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  width?: Width;
  showIcon?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = (
    { ref, className, children, variant = "primary", size = "md", width = "full", showIcon = false, icon, iconPosition = "right", disabled, ...props }: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }
  ) => {
    const v = variantClasses[variant];
    const s = sizeClasses[size];
    const w = width === "full" ? "w-full" : "w-auto";
    const isDisabled = disabled || variant === "disabled";

    const IconToShow = icon ?? <ChevronRight className="h-5 w-5" />;

    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          v,
          s,
          w,
          isDisabled && "cursor-not-allowed opacity-80",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        <div
          className={clsx(
            "inline-flex items-center justify-center gap-2",
            iconPosition === "left" && "flex-row-reverse"
          )}
        >
          {showIcon && iconPosition === "left" && IconToShow}
          <span className="truncate">{children}</span>
          {showIcon && iconPosition === "right" && IconToShow}
        </div>
      </button>
    );
  };

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary/40";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-green-primary text-white hover:bg-green-primary/90",
  outline:
    "bg-white text-black border border-black/10 shadow-sm hover:bg-black/5",
  disabled: "bg-dark-gray text-white",
};

const sizeClasses: Record<Size, string> = {
  lg: "h-14 px-6 text-h2",
  md: "h-11 px-5 text--base",
  sm: "py-2 px-3 text-small h-auto",
};
