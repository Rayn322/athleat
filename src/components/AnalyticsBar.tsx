// src/components/AnalyticsBar.tsx
import React from "react";
import clsx from "clsx";

type Variant = "onTrack" | "low";

export type AnalyticsBarProps = {
  label: string;
  variant: Variant;
  value: number;
  goal: number;
  max: number;
  goalBandPct?: number;
  onQuickAdd?: () => void;
  className?: string;
};

export function AnalyticsBar({
  label,
  variant,
  value,
  goal,
  max,
  goalBandPct = 12,
  onQuickAdd,
  className,
}: AnalyticsBarProps) {
  const pct = clamp((value / max) * 100, 0, 100);
  const goalPct = clamp((goal / max) * 100, 0, 100);

  const fillColor = variant === "onTrack" ? "bg-green-primary" : "bg-red";
  const statusText = variant === "onTrack" ? "on track" : "low";

  const bandWidth = clamp(goalBandPct, 0, 100);
  const bandLeft = clamp(goalPct - bandWidth / 2, 0, 100 - bandWidth);

  return (
    <section
      className={clsx("w-full max-w-[480px]", className)}
      aria-label={`${label} analytics`}
    >
      {/* Top row: label + status */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-h3">{label}</h3>
        <span className="text-base">{statusText}</span>
      </div>

      {/* Bar */}
      <div className="relative h-6 w-full">
        {/* Track */}
        <div className="absolute inset-0 z-0 rounded-full bg-light-gray" />

        {/* Fill */}
        <div
          className={clsx(
            "absolute top-0 z-10 h-full rounded-full transition-[width] duration-300",
            fillColor,
          )}
          style={{ width: `${pct}%` }}
        />

        {/* Goal band (on top) */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 z-20 h-full rounded-full bg-gray-60"
          style={{ width: `${bandWidth}%`, left: `${bandLeft}%` }}
        />

        {/* Goal tick + label */}
        <div
          aria-hidden
          className="absolute inset-y-0 z-30 w-0.5 -translate-x-1/2 bg-dark-gray"
          style={{ left: `${goalPct}%` }}
        />
        <div
          aria-hidden
          className="absolute -top-5 z-30 -translate-x-1/2 text-small text-dark-gray"
          style={{ left: `${goalPct}%` }}
        >
          goal
        </div>

        <span className="sr-only">
          {label} {Math.round(pct)} percent of maximum. Goal at{" "}
          {Math.round(goalPct)} percent.
        </span>
      </div>

      {/* Quick add below bar (only for low) */}
      {variant === "low" && onQuickAdd && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={onQuickAdd}
            className={clsx(
              "cursor-pointer text-base underline underline-offset-2 hover:opacity-90 active:opacity-80",
            )}
          >
            quick add
          </button>
        </div>
      )}
    </section>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
