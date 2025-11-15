import { GroceryItem } from "../components/GroceryItem";
import { useState } from "react";

export default function GroceryList() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    "protein bar": false,
    almonds: false,
    "greek yogurt": false,
    lettuce: false,
    "beef patties": false,
    tomato: false,
    cheese: false,
    pickles: false,
    salmon: false,
  });

  const handleToggle = (label: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [label]: checked }));
  };

  return (
    <div className="space-y-13">
      <h1 className="text-h1">your grocery list</h1>
      <section className="mb-5 space-y-3">
        {Object.entries(checkedItems).map(([label, checked]) => (
          <GroceryItem
            key={label}
            label={label}
            checked={checked}
            onChange={(c) => handleToggle(label, c)}
          />
        ))}
      </section>
    </div>
  );
}
