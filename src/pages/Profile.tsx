import { Checkbox } from "../components/Checkbox";
import { ContactCard } from "../components/ContactCard";
import { Users, User, Calendar, Heart } from "lucide-react";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useSchedule, usePreferences, useUser, useUserMetrics } from "../utils/localStorageHooks";
import { convert24hTo12h } from "../utils/time";
import React, { useRef } from "react";

export default function History() {
  const navigate = useNavigate();
  const [schedule] = useSchedule();
  const [prefs] = usePreferences();
  const [user] = useUser();
  const [metrics, setMetrics] = useUserMetrics();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setMetrics({
        ...metrics,
        profilePic: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const grouped = schedule.reduce((acc, item) => {
    item.days.forEach((d) => {
      if (!acc[d]) acc[d] = [];
      acc[d].push(item);
    });
    return acc;
  }, {} as Record<number, any[]>);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <BackButton />
      </div>

      <h1 className="text-h1">your profile</h1>

      {/* PROFILE */}
      <div className="flex flex-row space-x-3 rounded-xl border-2 border-light-gray p-6">
        <img
          src={metrics?.profilePic}
          className="h-20 w-20 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <p className="text-h2 font-semibold">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-base">
            {metrics?.college ?? ""} | {metrics?.sport ?? ""}
          </p>

          <button
            className="underline text-sm mt-1"
            onClick={() => fileInputRef.current?.click()}
          >
            upload profile photo
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={onFileSelected}
          />

          <a className="underline text-sm mt-1" href="/history">
            see history
          </a>
        </div>
      </div>

      {/* PROGRESS SHARING */}
      <div className="space-y-4">
        <div className="flex flex-row gap-3 border-b-2 border-light-gray pb-3">
          <Users className="h-6 w-6 text-black" />
          <p className="text-h3">progress sharing</p>
        </div>

        <div className="flex flex-row gap-3">
          <Checkbox />
          <span className="text-base">sharing dietary progress</span>
        </div>

        <div className="flex flex-row space-x-3">
          <ContactCard name="coach joel" company="cuesta college" />
          <ContactCard name="dr. johnson" company="dietitian, doctor" />
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="mb-5 space-y-4">
        <div className="flex flex-row justify-between border-b-2 border-light-gray pb-3">
          <div className="flex flex-row gap-3">
            <User className="h-6 w-6 text-black" />
            <p className="text-h3">personal information</p>
          </div>

          <button
            onClick={() => navigate("/input-metrics")}
            className="text-sm underline text-dark-gray"
          >
            edit
          </button>
        </div>

        <div className="space-y-2">
          <InfoRow label="diet goal" value="" />
          <InfoRow label="weight" value="" />
          <InfoRow label="height" value="" />
          <InfoRow label="gender" value="" />
          <InfoRow label="age" value="" />
          <InfoRow label="sport" value="" />
          <InfoRow label="food restrictions" value="" />
        </div>
      </div>

      {/* SCHEDULE */}
      <div className="mb-5 space-y-4">
        <div className="flex flex-row justify-between border-b-2 border-light-gray pb-3">
          <div className="flex flex-row gap-3">
            <Calendar className="h-6 w-6 text-black" />
            <p className="text-h3">schedule</p>
          </div>

          <button
            onClick={() => navigate("/input-schedule")}
            className="text-sm underline text-dark-gray"
          >
            edit
          </button>
        </div>

        <div className="space-y-4">
          {Object.keys(grouped).length === 0 && (
            <p className="text-sm text-dark-gray">no schedule added yet.</p>
          )}

          {Object.keys(grouped)
            .sort((a, b) => Number(a) - Number(b))
            .map((day) => (
              <div key={day} className="space-y-2">
                <p className="text-base font-semibold">{dayNames[day]}</p>

                <div className="space-y-2 pl-3">
                  {grouped[day].map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-light-gray p-3"
                    >
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-dark-gray">
                        {item.type} • {convert24hTo12h(item.time.start)}–
                        {convert24hTo12h(item.time.end)}
                      </p>

                      {!item.recurring && (
                        <p className="text-xs text-dark-gray">
                          one-time event
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* PREFERENCES */}
        <div className="mb-5 space-y-4">
          <div className="flex flex-row justify-between border-b-2 border-light-gray pb-3">
            <div className="flex flex-row gap-3">
              <Heart className="h-6 w-6 text-black" />
              <p className="text-h3">meal preferences</p>
            </div>

            <button
              onClick={() => navigate("/preferences")}
              className="text-sm underline text-dark-gray"
            >
              edit
            </button>
          </div>

          <p className="font-semibold text-base">liked meals</p>
          {prefs.likedMeals.length === 0 ? (
            <p className="text-sm text-dark-gray">no liked meals yet.</p>
          ) : (
            <div className="space-y-2 pl-3">
              {prefs.likedMeals.map((m) => (
                <p key={m.id} className="text-base">
                  {m.title}
                </p>
              ))}
            </div>
          )}

          <p className="font-semibold text-base mt-4">disliked meals</p>
          {prefs.dislikedMeals.length === 0 ? (
            <p className="text-sm text-dark-gray">no disliked meals yet.</p>
          ) : (
            <div className="space-y-2 pl-3">
              {prefs.dislikedMeals.map((m) => (
                <p key={m.id} className="text-base">
                  {m.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-row gap-3">
      <p className="w-40 text-base text-dark-gray">{label}:</p>
      <p className="text-base text-black">{value}</p>
    </div>
  );
}
