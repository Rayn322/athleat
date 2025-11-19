import { ChevronLeft, CircleMinus, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import leafLogo from "../assets/icons/leafLogo.svg";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import type { ScheduleItem } from "../types/localStorage";
import { useSchedule } from "../utils/localStorageHooks";
import { removeScheduleItem } from "../utils/scheduleStorage";
import { convert24hTo12h } from "../utils/time";

export default function InputSchedule() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useSchedule();

  function handleRemove(id: string) {
    removeScheduleItem(id, setSchedule);
  }

  const groupedItems = {
    class: schedule.filter((i) => i.type === "class"),
    practice: schedule.filter((i) => i.type === "practice"),
    event: schedule.filter((i) => i.type === "event"),
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

        {schedule.length === 0 && (
          <p className="text-base text-dark-gray">No schedule items yet.</p>
        )}
      </div>

      {/* Continue button */}
      <div className="mt-6 w-full">
        <Button
          variant={schedule.length === 0 ? "disabled" : "primary"}
          size="md"
          width="full"
          disabled={schedule.length === 0}
          onClick={() => navigate("/input-metrics")}
        >
          continue
        </Button>
      </div>
    </div>
  );
}

/* --- Render item --- */
function renderScheduleItem(it: ScheduleItem, removeFn: (id: string) => void) {
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

function renderDaysSummary(it: ScheduleItem) {
  if (!it.days || it.days.length === 0) return "";
  const dayLabels = ["S", "M", "T", "W", "Th", "F", "S"];
  return it.days.map((d) => dayLabels[d]).join(" ");
}

function renderTimeSummary(it: ScheduleItem) {
  // if (it.sameTimeDaily && it.time)
  return `${convert24hTo12h(it.time.start)} - ${convert24hTo12h(it.time.end)}`;

  // if (!it.sameTimeDaily && it.schedule?.length)
  //   return `${convert24hTo12h(it.schedule[0].time.start)} - ${convert24hTo12h(it.schedule[0].time.end)} (varies)`;

  // return "";
}
