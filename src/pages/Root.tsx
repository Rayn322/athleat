import { ChevronRight, Plus, Check } from "lucide-react";
import { Link } from "react-router";
import { AnalyticsBar } from "../components/AnalyticsBar";
import { Button} from "../components/Button";
import { QuickAddItem } from "../components/QuickAddItem";
import { NavBar } from "../components/NavBar";



export default function Root() {
  return (
    <div>
      <p>This is the main page</p>
      <div className="space-y-4 p-6">
        {/* Default icon (ChevronRight) */}
        <Button variant="primary" showIcon>
          Continue
        </Button>

        {/* Custom icon */}
        <Button variant="primary" width="hug" showIcon icon={<Plus className="h-4 w-4" />} size="sm">
          Add Item
        </Button>

        {/* Left icon */}
        <Button
          variant="outline"
          showIcon
          icon={<Check className="h-5 w-5" />}
          iconPosition="left"
        >
          Confirm
        </Button>

        {/* Disabled visual + actual disabled */}
        <Button variant="disabled" width="hug">
          Disabled
        </Button>

        <QuickAddItem
          name="Protein Bar"
          imageSrc="/images/protein-bar.jpg"
        />

        <NavBar active="home" />
        <NavBar active="analytics" />
        <NavBar active="cart" />

        <NavBar active="home" useNotifCartIcon />
        <NavBar active="analytics" useNotifCartIcon />
        <NavBar active="cart" useNotifCartIcon />
      </div>

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
