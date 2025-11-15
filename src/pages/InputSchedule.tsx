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

  const groupedItems = {
    class: items.filter((i) => i.type === "class"),
    practice: items.filter((i) => i.type === "practice"),
    event: items.filter((i) => i.type === "event"),
  };

  return (
    <div className="flex w-[392px] min-h-[852px] flex-col px-6 pt-[60px] pb-10 bg-bg-white mx-auto">

      {/* Top Row */}
      <div className="flex items-center justify-between mb-6 w-full">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="w-[304px] shrink-0">
          <ProgressBar value={1} max={3} height={9} />
        </div>
      </div>

      {/* Logo + title */}
      <div className="flex flex-col gap-3 mb-6">
        <img src={leafLogo} alt="Leaf Logo" className="w-[67.2px] h-[71.8px]" />
        <h1 className="text-h1 text-black font-normal">add your schedule.</h1>
        <p className="text-small italic text-dark-gray">psst! you can edit this later.</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 mt-2 w-full flex flex-col gap-8">

        {/* --------------------- CLASS SECTION --------------------- */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center gap-3 px-2 py-1"
            onClick={() => navigate("/add-class")}
          >
            <CirclePlus className="w-6 h-6" />
            <span className="text-h1 font-normal">class</span>
          </button>

          {groupedItems.class.length > 0 && (
            <div className="flex flex-col gap-2 pl-6">
              {groupedItems.class.map((it) =>
                renderScheduleItem(it, handleRemove)
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
            <CirclePlus className="w-6 h-6" />
            <span className="text-h1 font-normal">practice</span>
          </button>

          {groupedItems.practice.length > 0 && (
            <div className="flex flex-col gap-2 pl-6">
              {groupedItems.practice.map((it) =>
                renderScheduleItem(it, handleRemove)
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
            <CirclePlus className="w-6 h-6" />
            <span className="text-h1 font-normal">event</span>
          </button>

          {groupedItems.event.length > 0 && (
            <div className="flex flex-col gap-2 pl-6">
              {groupedItems.event.map((it) =>
                renderScheduleItem(it, handleRemove)
              )}
            </div>
          )}
        </div>

        {items.length === 0 && (
          <p className="text-dark-gray text-base">No schedule items yet.</p>
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
function renderScheduleItem(it: ScheduleItem, removeFn: any) {
  return (
    <div key={it.id} className="flex items-center gap-3 py-1">
      <button onClick={() => removeFn(it.id)}>
        <CircleMinus className="w-6 h-6" />
      </button>

      <div className="flex flex-col">
        <div className="text-base text-black">
          {it.name}{" "}
          <span className="text-dark-gray">{renderDaysSummary(it)}</span>
        </div>

        <div className="text-small text-dark-gray">
          {renderTimeSummary(it)}
        </div>
      </div>
    </div>
  );
}

function renderDaysSummary(it: ScheduleItem) {
  if (!it.days || it.days.length === 0) return "";
  return it.days.join("");
}

function renderTimeSummary(it: ScheduleItem) {
  if (it.sameTimeDaily && it.time)
    return `${it.time.start} - ${it.time.end}`;

  if (!it.sameTimeDaily && it.schedule?.length)
    return `${it.schedule[0].time.start} - ${it.schedule[0].time.end} (varies)`;

  return "";
}
