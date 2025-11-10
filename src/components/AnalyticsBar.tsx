// src/components/AnalyticsBar.tsx
import React from "react";

type Variant = "onTrack" | "low";

export type AnalyticsBarProps = {
  label: string;        // e.g., "Carbs"
  variant: Variant;     // "onTrack" | "low"
  value: number;        // current amount
  goal: number;         // target amount
  max: number;          // scale maximum (same unit)
  goalBandPct?: number; // width of gray goal band (default 12%)
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
      className={["w-full max-w-[480px]", className].join(" ")}
      aria-label={`${label} analytics`}
    >
      {/* Top row: label + status */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-h3">{label}</h3>
        <span className="text-base">{statusText}</span>
      </div>

      {/* Bar */}
      <div className="relative h-6 w-full">
        {/* Track (z-0) */}
        <div className="absolute inset-0 rounded-full bg-light-gray z-0" />

        {/* Fill below the goal band (z-10) */}
        <div
          className={`absolute top-0 h-full rounded-full ${fillColor} z-10 transition-[width] duration-300`}
          style={{ width: `${pct}%` }}
        />

        {/* Goal band ON TOP of fill (z-20), translucent gray */}
        <div
          aria-hidden
          className="absolute top-0 h-full rounded-full bg-gray-60 z-20 pointer-events-none"
          style={{ width: `${bandWidth}%`, left: `${bandLeft}%` }}
        />

        {/* Goal tick + label above everything (z-30) */}
        <div
          aria-hidden
          className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-dark-gray z-30"
          style={{ left: `${goalPct}%` }}
        />
        <div
          aria-hidden
          className="absolute -top-5 -translate-x-1/2 text-small text-dark-gray z-30"
          style={{ left: `${goalPct}%` }}
        >
          goal
        </div>

        {/* a11y description */}
        <span className="sr-only">
          {label} {Math.round(pct)} percent of maximum. Goal at{" "}
          {Math.round(goalPct)} percent.
        </span>
      </div>

      {/* Quick add BELOW the bar, right-aligned (only for low) */}
      {variant === "low" && onQuickAdd ? (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={onQuickAdd}
            className="text-base underline underline-offset-2 hover:opacity-90 active:opacity-80 cursor-pointer"
          >
            quick add
          </button>
        </div>
      ) : null}
    </section>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
