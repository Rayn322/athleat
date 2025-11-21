import { Checkbox } from "../components/Checkbox";
import { ContactCard } from "../components/ContactCard";
import { Users, User, Calendar } from "lucide-react";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useSchedule } from "../utils/localStorageHooks";
import { convert24hTo12h } from "../utils/time";

export default function History() {
  const navigate = useNavigate();
  const [schedule] = useSchedule();

  // days map
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // group schedule by days
  const grouped = schedule.reduce((acc, item) => {
    item.days.forEach((d) => {
      if (!acc[d]) acc[d] = [];
      acc[d].push(item);
    });
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Top Row */}
      <div className="flex flex-row justify-between">
        <BackButton />
      </div>

      <h1 className="text-h1">your profile</h1>

      {/* Profile Card */}
      <div className="flex flex-row space-x-3 rounded-xl border-2 border-light-gray p-6">
        <img src="Images/sarah.png" className="h-20 w-20 rounded-4xl" />
        <div>
          <p className="text-h2 font-semibold">Sarah Smith</p>
          <p className="text-base">Cuesta College | Swim & Dive</p>
          <a className="text-base underline" href="/history">
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
          <ContactCard name={"coach joel"} company={"cuesta college"} />
          <ContactCard name={"dr. johnson"} company={"dietitian, doctor"} />
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
          <InfoRow label="diet goal" value="maintain composition" />
          <InfoRow label="weight" value="115 lbs" />
          <InfoRow label="height" value="5ft 4in" />
          <InfoRow label="gender" value="female" />
          <InfoRow label="age" value="20" />
          <InfoRow label="sport" value="swimming" />
          <InfoRow label="food restrictions" value="peanuts, gluten-free" />
        </div>
      </div>

      {/* SCHEDULE SECTION */}
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

        {/* --- Schedule Summary --- */}
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
                        {item.type} • {convert24hTo12h(item.time.start)}–{convert24hTo12h(item.time.end)}
                      </p>
                      {!item.recurring && (
                        <p className="text-xs text-dark-gray">one-time event</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* Helper component */
function InfoRow({ label, value }) {
  return (
    <div className="flex flex-row gap-3">
      <p className="w-40 text-base text-dark-gray">{label}:</p>
      <p className="text-base text-black">{value}</p>
    </div>
  );
}
