// src/routes/Root.tsx
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { AnalyticsBar } from "../components/AnalyticsBar";
import { ProgressBar } from "../components/ProgressBar";
import { MealOption } from "../components/MealOption";
import { GroceryItem } from "../components/GroceryItem";
import { Tag } from "../components/Tag";
import React, { useState } from "react";

export default function Root() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    "protein bar": false,
    "almonds": true,
    "greek yogurt": false,
  });

  const handleToggle = (label: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [label]: checked }));
  };

  return (
    <div className="space-y-6">
      <p>This is the main page</p>

      {/* Example Analytics Bars (unchanged) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Analytics Bars</h2>
        <AnalyticsBar label="Carbs" variant="onTrack" value={55} goal={50} max={100} />
        <AnalyticsBar
          label="Protein"
          variant="low"
          value={20}
          goal={60}
          max={100}
          onQuickAdd={() => alert("Quick Add clicked!")}
        />
      </section>

      {/* Stacked Progress Bars like the screenshot */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Progress Bars</h2>
        <div className="space-y-5 bg-white p-6">
          <ProgressBar value={18}  height={18} className="mb-4" />
          <ProgressBar value={45}  height={18} className="mb-4" />
          <ProgressBar value={68}  height={18} className="mb-4" />
          <ProgressBar value={100} height={18} className="mb-4" />
          <ProgressBar value={30}  height={18} className="mb-4" />
          <ProgressBar value={0}   height={18} className="mb-4" />
          <ProgressBar value={60}  height={18} className="mb-4" />
          <ProgressBar value={72}  height={18} className="mb-4" />
          <ProgressBar value={85}  height={18} className="mb-4" />
        </div>
      </section>

      {/* Example Meal Options */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Meal Options</h2>
        <MealOption
          title="Cheese Burger"
          imageSrc="/Images/burger.jpg"
          tags={["high protein", "carbs"]}
          ingredients={["Bread", "Patty", "Lettuce", "Tomato", "Cheese", "Pickles"]}
        />

        <MealOption
          title="Cheese Burger"
          imageSrc="/Images/burger.jpg"
          tags={["high protein", "carbs"]}
          ingredients={["Bread", "Patty", "Lettuce", "Tomato", "Cheese", "Pickles"]}
          selected
        />
      </section>

      {/* Example Grocery Items */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Grocery Items</h2>
        <div className="max-w-lg space-y-3 bg-white p-6">
          {Object.entries(checkedItems).map(([label, checked]) => (
            <GroceryItem
              key={label}
              label={label}
              checked={checked}
              onChange={(c) => handleToggle(label, c)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tags</h2>
        <div className="space-y-5 bg-white p-6">
          {/* green outline */}
          <Tag label="Protein" variant="outline-green" size="lg" />
          <Tag label="Protein" variant="outline-green" size="sm" />

          {/* black outline */}
          <Tag label="Protein" variant="outline-black" size="lg" />
          <Tag label="Protein" variant="outline-black" size="sm" />

          {/* solid black */}
          <Tag label="Protein" variant="black" size="lg" />
          <Tag label="Protein" variant="black" size="sm" />
        </div>
      </section>

      {/* Navigation link */}
      <Link
        to="/other"
        className="flex w-fit gap-2 rounded-3xl bg-green-primary px-4 py-3 text-white hover:opacity-90 active:opacity-80 transition"
      >
        <span>Go to other page</span>
        <ChevronRight />
      </Link>
    </div>
  );
}
