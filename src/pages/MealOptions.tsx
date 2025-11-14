// src/pages/MealOptions.tsx
import { useLocation, useNavigate } from "react-router";
import { MealOption } from "../components/MealOption";

export default function MealOptions() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { next?: string } };
  const next = location.state?.next ?? "/Groceries2";

  const choose = () => navigate(next);

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-3xl font-medium lowercase">meal options</h1>
      <div className="text-right text-sm text-black/70">
        0 of 7 days planned
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-200">
        <div className="h-2 rounded-full bg-black" style={{ width: "0%" }} />
      </div>

      <MealOption
        title="Cheese Burger"
        imageSrc="/Images/burger.jpg"
        tags={["high protein", "carbs"]}
        ingredients={[
          "Bread",
          "Patty",
          "Lettuce",
          "Tomato",
          "Cheese",
          "Pickles",
        ]}
        onSelect={choose}
      />
      <MealOption
        title="Veggie Bowl"
        imageSrc="/Images/burger.jpg"
        tags={["vegetarian"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
        onSelect={choose}
      />
      <MealOption
        title="Salmon"
        imageSrc="/Images/burger.jpg"
        tags={["high protein"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
        onSelect={choose}
      />
      <MealOption
        title="Salad"
        imageSrc="/Images/burger.jpg"
        tags={["vegetarian"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
        onSelect={choose}
      />
      <MealOption
        title="Terriyaki Chicken"
        imageSrc="/Images/burger.jpg"
        tags={["high protein"]}
        ingredients={["Rice", "Beans", "Corn", "Salsa", "Avocado"]}
        onSelect={choose}
      />
    </section>
  );
}
