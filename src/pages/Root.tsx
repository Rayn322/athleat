import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { AnalyticsBar } from "../components/AnalyticsBar";


export default function Root() {
  return (
    <div>
      <p>This is the main page</p>

      {/* Example Analytics Bars */}
      <AnalyticsBar
        label="Carbs"
        variant="onTrack"
        value={55}
        goal={50}
        max={100}
      />
      <AnalyticsBar
        label="Carbs"
        variant="low"
        value={20}
        goal={60}
        max={100}
        onQuickAdd={() => alert("Quick Add clicked!")}
      />

      <Link
        to="/other"
        className="flex w-fit gap-2 rounded-3xl bg-green-primary px-4 py-3 text-white"
      >
        <span>Go to other page</span>
        <ChevronRight />
      </Link>
    </div>
  );
}
