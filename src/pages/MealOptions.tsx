// src/pages/MealOptions.tsx
import { MealOption } from "../components/MealOption";

export default function MealOptions() {
  return (
    <section className="space-y-6 p-6">
      <h2 className="text-lg font-semibold">Meal Options (click to toggle)</h2>

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
        tags={["vegetarian"]}
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
