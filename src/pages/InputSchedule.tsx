// src/pages/InputSchedule.tsx
import { useEffect, useState } from "react";
import { ChevronLeft, CirclePlus, CircleMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import leafLogo from "../assets/icons/leafLogo.svg";
import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";

import { loadSchedule, removeScheduleItem } from "../utils/scheduleStorage";
import type { ScheduleItem } from "../types/schedule";

export default function InputSchedule() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    setItems(loadSchedule());
  }, []);

  function handleRemove(id: string) {
    removeScheduleItem(id);
    setItems(loadSchedule());
  }

  return (
    <div className="mx-auto flex h-[852px] w-[392px] flex-col bg-bg-white px-6 pt-[60px] pb-10">
      {/* Top Row: Back Button + Progress Bar */}
      <div className="mb-6 flex w-full items-center justify-between">
        {/* Back button */}
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Progress Bar (same as AddClass) */}
        <div className="w-[304px] shrink-0">
          <ProgressBar value={1} max={3} height={9} />
        </div>
      </div>

      {/* Logo + title */}
      <div className="mb-6 flex flex-col gap-3">
        <img src={leafLogo} alt="Leaf Logo" className="h-[71.8px] w-[67.2px]" />
        <h1 className="text-h1 font-normal text-black">add your schedule.</h1>
        <p className="text-small text-dark-gray italic">
          psst! you can edit this later.
        </p>
      </div>

      {/* Add buttons + list */}
      <div className="mt-6 w-full flex-1">
        <div className="flex flex-col gap-5">
          <button
            className="flex items-center gap-3 py-2"
            onClick={() => navigate("/add-class")}
          >
            <CirclePlus className="h-6 w-6" />
            <span className="text-h1 font-normal">class</span>
          </button>

          <button
            className="flex items-center gap-3 py-2"
            onClick={() => navigate("/add-practice")}
          >
            <CirclePlus className="h-6 w-6" />
            <span className="text-h1 font-normal">practice</span>
          </button>

          <button
            className="flex items-center gap-3 py-2"
            onClick={() => navigate("/add-event")}
          >
            <CirclePlus className="h-6 w-6" />
            <span className="text-h1 font-normal">event</span>
          </button>
        </div>

        {/* Existing items */}
        <div className="mt-8 space-y-4">
          {items.length === 0 && (
            <p className="text-base text-dark-gray">No schedule items yet.</p>
          )}

          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-4 rounded-xl bg-white px-9 py-3 shadow-sm"
            >
              <button onClick={() => handleRemove(it.id)}>
                <CircleMinus className="h-6 w-6" />
              </button>

              <div className="flex flex-col">
                <div className="text-base font-normal text-black">
                  {it.name}{" "}
                  <span className="text-dark-gray">
                    {renderDaysSummary(it)}
                  </span>
                </div>
                <div className="text-small text-dark-gray">
                  {renderTimeSummary(it)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary button */}
      <div className="mt-6 w-full">
        <Button
          variant={items.length === 0 ? "disabled" : "primary"}
          size="md"
          width="full"
          disabled={items.length === 0}
          onClick={() => navigate("/setup/next")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

/** Helpers */
function renderDaysSummary(it: ScheduleItem) {
  if (!it.days || it.days.length === 0) return "";
  return it.days.join("");
}

function renderTimeSummary(it: ScheduleItem) {
  if (it.sameTimeDaily && it.time) {
    return `${it.time.start} - ${it.time.end}`;
  } else if (!it.sameTimeDaily && it.schedule?.length) {
    const s = it.schedule[0];
    return `${s.time.start} - ${s.time.end} (varies)`;
  }
  return "";
}
