import React from "react";

type ProgressBarProps = {
  /** current value */
  value: number;
  /** maximum value (defaults to 100) */
  max?: number;
  /** height in px or any CSS size (defaults to 16) */
  height?: number | string;
  /** extra classes for the outer track */
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  height = 16,
  className = "",
}: ProgressBarProps) {
  const pct = clamp((value / max) * 100, 0, 100);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={`w-full rounded-full bg-gray-300/60 overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full bg-green-600 transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
