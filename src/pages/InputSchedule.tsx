import { useEffect, useState } from "react";
import { ChevronLeft, CirclePlus, CircleMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import leafLogo from "../assets/icons/leafLogo.svg";
import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";

import { loadSchedule, removeScheduleItem } from "../utils/scheduleStorage";
import type { ScheduleEvent } from "../types/localStorage";
import { convert24hTo12h } from "../utils/time";

export default function InputSchedule() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    setItems(loadSchedule());
  }, []);

  function handleRemove(id: string) {
    removeScheduleItem(id);
    setItems(loadSchedule());
  }

  const groupedItems = {
    class: items.filter((i) => i.type === "class"),
    practice: items.filter((i) => i.type === "practice"),
    event: items.filter((i) => i.type === "event"),
  };

  return (
    <div className="mx-auto flex min-h-[852px] w-[392px] flex-col bg-bg-white px-6 pt-[60px] pb-10">
      {/* Top Row */}
      <div className="mb-6 flex w-full items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </button>
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

      {/* MAIN CONTENT */}
      <div className="mt-2 flex w-full flex-1 flex-col gap-8">
        {/* --------------------- CLASS SECTION --------------------- */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center gap-3 px-2 py-1"
            onClick={() => navigate("/add-class")}
          >
            <CirclePlus className="h-6 w-6" />
            <span className="text-h1 font-normal">class</span>
          </button>

          {groupedItems.class.length > 0 && (
            <div className="flex flex-col gap-2 pl-6">
              {groupedItems.class.map((it) =>
                renderScheduleItem(it, handleRemove),
              )}
            </div>
          )}
        </div>

        {/* --------------------- PRACTICE SECTION --------------------- */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center gap-3 px-2 py-1"
            onClick={() => navigate("/add-practice")}
          >
            <CirclePlus className="h-6 w-6" />
            <span className="text-h1 font-normal">practice</span>
          </button>

          {groupedItems.practice.length > 0 && (
            <div className="flex flex-col gap-2 pl-6">
              {groupedItems.practice.map((it) =>
                renderScheduleItem(it, handleRemove),
              )}
            </div>
          )}
        </div>

        {/* --------------------- EVENT SECTION --------------------- */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center gap-3 px-2 py-1"
            onClick={() => navigate("/add-event")}
          >
            <CirclePlus className="h-6 w-6" />
            <span className="text-h1 font-normal">event</span>
          </button>

          {groupedItems.event.length > 0 && (
            <div className="flex flex-col gap-2 pl-6">
              {groupedItems.event.map((it) =>
                renderScheduleItem(it, handleRemove),
              )}
            </div>
          )}
        </div>

        {items.length === 0 && (
          <p className="text-base text-dark-gray">No schedule items yet.</p>
        )}
      </div>

      {/* Continue button */}
      <div className="mt-6 w-full">
        <Button
          variant={items.length === 0 ? "disabled" : "primary"}
          size="md"
          width="full"
          disabled={items.length === 0}
          onClick={() => navigate("/input-metrics")}
        >
          continue
        </Button>
      </div>
    </div>
  );
}

/* --- Render item --- */
function renderScheduleItem(it: ScheduleEvent, removeFn: (id: string) => void) {
  return (
    <div key={it.id} className="flex items-center gap-3 py-1">
      <button onClick={() => removeFn(it.id)}>
        <CircleMinus className="h-6 w-6" />
      </button>

      <div className="flex flex-col">
        <div className="text-base text-black">
          {it.name}{" "}
          <span className="text-dark-gray">{renderDaysSummary(it)}</span>
        </div>

        <div className="text-small text-dark-gray">{renderTimeSummary(it)}</div>
      </div>
    </div>
  );
}

function renderDaysSummary(it: ScheduleEvent) {
  if (!it.days || it.days.length === 0) return "";
  return it.days.join("");
}

function renderTimeSummary(it: ScheduleEvent) {
  // if (it.sameTimeDaily && it.time)
  return `${convert24hTo12h(it.time.start)} - ${convert24hTo12h(it.time.end)}`;

  // if (!it.sameTimeDaily && it.schedule?.length)
  //   return `${convert24hTo12h(it.schedule[0].time.start)} - ${convert24hTo12h(it.schedule[0].time.end)} (varies)`;

  // return "";
}
