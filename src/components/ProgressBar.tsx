import React from "react";

type ProgressBarProps = {
  value: number;
  max?: number;
  height?: number | string;
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
      className={`w-full overflow-hidden rounded-full bg-light-gray ${className}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full bg-green-primary transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
