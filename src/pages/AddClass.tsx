// src/pages/AddClass.tsx
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Checkbox } from "../components/Checkbox";
import { TextBox } from "../components/TextBox";
import { Button } from "../components/Button";
import { addScheduleItem } from "../utils/scheduleStorage.ts";
import { v4 as uuidv4 } from "uuid";
import { ProgressBar } from "../components/ProgressBar";
import type { ScheduleItem } from "../types/localStorage.ts";
import { useSchedule } from "../utils/localStorageHooks.ts";

const allDays: { day: number; label: string }[] = [
  { day: 0, label: "S" },
  { day: 1, label: "M" },
  { day: 2, label: "T" },
  { day: 3, label: "W" },
  { day: 4, label: "TH" },
  { day: 5, label: "F" },
  { day: 6, label: "S" },
];

function useQueryType() {
  const loc = useLocation();
  const q = new URLSearchParams(loc.search).get("type");
  return (q as "class" | "practice" | "event") ?? "class";
}

export default function AddClass() {
  const navigate = useNavigate();
  const type = useQueryType();
  const [, setSchedule] = useSchedule();

  const [name, setName] = useState("");
  const [days, setDays] = useState<number[]>([]);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [frequency, setFrequency] =
    useState<ScheduleItem["frequency"]>("weekly");

  const recurring = true;
  const sameTimeDaily = true;

  // means that the order of the days relies on the order we click them in
  function toggleDay(day: number) {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  function simpleTimeSanitize(t: string) {
    return t.trim();
  }

  function handleAdd() {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    const item: ScheduleItem = {
      id: uuidv4(),
      type: type,
      name: name.trim(),
      recurring,
      sameTimeDaily,
      days: [...days].sort(),
      frequency,
      time: {
        start: simpleTimeSanitize(timeStart),
        end: simpleTimeSanitize(timeEnd),
      },
      startDate,
      endDate,
    };

    addScheduleItem(item, setSchedule);
    navigate("/input-schedule");
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col bg-bg-white px-6 pt-10 pb-10">
      {/* Top Row: Back Button + Progress Bar */}
      <div className="mb-6 flex w-full items-center justify-between">
        {/* Back button */}
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Progress Bar */}
        <div className="w-[304px] shrink-0">
          <ProgressBar value={1} max={3} height={9} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="text-h1 font-normal">{`add ${type}`}</h1>
          </div>

          <div className="mb-6">
            <TextBox
              label={`${type} name`}
              value={name}
              onChange={setName}
              placeholder={`enter ${type} name`}
            />
          </div>

          {/* Locked checkboxes */}
          <div className="mb-6 flex items-center gap-4">
            <div className="pointer-events-none">
              <Checkbox defaultChecked={true} />
            </div>
            <div className="text-small font-medium">recurring event</div>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="pointer-events-none">
              <Checkbox defaultChecked={true} />
            </div>
            <div className="text-small font-medium">
              meets at the same time every day
            </div>
          </div>

          {/* Repeat days */}
          <div className="mb-6">
            <div className="text-base text-dark-gray">repeat:</div>
            <div className="mt-3 flex flex-wrap gap-3 pr-2">
              {allDays.map((d) => {
                const selected = days.includes(d.day);
                return (
                  <button
                    key={d.day}
                    className={`rounded-full px-3 py-1 ${
                      selected
                        ? "bg-green-primary text-white"
                        : "border border-light-gray bg-transparent text-dark-gray"
                    }`}
                    onClick={() => toggleDay(d.day)}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Global time */}
          <div className="mb-6">
            <div className="text-base text-dark-gray">time:</div>
            <div className="mt-3 flex gap-3">
              <input
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                placeholder="3:00 PM"
                className="w-36 rounded-xl p-3 outline outline-light-gray"
              />
              <div className="self-center">-</div>
              <input
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                placeholder="5:00 PM"
                className="w-36 rounded-xl p-3 outline outline-light-gray"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="mb-6">
            <div className="text-base text-dark-gray">starts:</div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="MM/DD/YYYY"
              className="mt-2 w-full rounded-xl p-3 outline outline-light-gray"
            />
          </div>

          <div className="mb-6">
            <div className="text-base text-dark-gray">ends:</div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="MM/DD/YYYY"
              className="mt-2 w-full rounded-xl p-3 outline outline-light-gray"
            />
          </div>

          {/* Frequency */}
          <div className="mb-6">
            <div className="text-base text-dark-gray">frequency:</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="rounded-full border-2 border-light-gray px-3 py-2">
                <select
                  value={frequency}
                  onChange={(e) =>
                    setFrequency(e.target.value as ScheduleItem["frequency"])
                  }
                  className="bg-transparent outline-none"
                >
                  <option value="weekly">weekly</option>
                  <option value="biweekly">biweekly</option>
                  <option value="monthly">monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Add button */}
        <div className="mt-6">
          <Button variant="primary" size="md" width="full" onClick={handleAdd}>
            add {type}
          </Button>
        </div>
      </div>
    </div>
  );
}
