// src/pages/MealOptions.tsx
import { MealOption } from "../components/MealOption";

export default function MealOptions() {
  return (
    <section className="space-y-6 p-6">
      {/* title */}
      <h1 className="text-3xl font-medium lowercase">meal options</h1>

      {/* planned summary (right-aligned) */}
      <div className="text-sm text-black/70 text-right">
        0 of 7 days planned
      </div>

      {/* thin progress bar */}
      <div className="w-full h-2 rounded-full bg-neutral-200">
        <div className="h-2 rounded-full bg-black" style={{ width: "0%" }} />
      </div>

      {/* cards: spacing remains exactly the same */}
      <MealOption
        title="Cheese Burger"
        imageSrc="/Images/burger.jpg"
        tags={["high protein", "carbs"]}
        ingredients={["Bread", "Patty", "Lettuce", "Tomato", "Cheese", "Pickles"]}
      />

      <MealOption
        title="Veggie Bowl"
        imageSrc="/Images/burger.jpg"
        tags={["vegetarian"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
      />

      <MealOption
        title="Salmon"
        imageSrc="/Images/burger.jpg"
        tags={["high protein"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
      />

      <MealOption
        title="Salad"
        imageSrc="/Images/burger.jpg"
        tags={["vegetarian"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
      />

      <MealOption
        title="Terriyaki Chicken"
        imageSrc="/Images/burger.jpg"
        tags={["high protein"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
      />
    </section>
  );
}
