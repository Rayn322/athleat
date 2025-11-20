// src/pages/MealOptions.tsx
import { useLocation, useNavigate } from "react-router";
import { MealOption } from "../components/MealOption";
import { useEffect } from "react";
import BackButton from "../components/BackButton";
import { MEALS } from "../utils/meals";
import type { Meal } from "../types/localStorage";
import { useMeals } from "../utils/localStorageHooks";

export default function MealOptions() {
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: { day: number; mealType: "breakfast" | "lunch" | "dinner" };
  };

  const [, setMeals] = useMeals();

  useEffect(() => {
    if (!location.state?.day || !location.state?.mealType) {
      navigate("/home");
    }
  }, [location.state, navigate]);

  function choose(meal: Meal) {
    const day = location.state?.day;
    const mealType = location.state?.mealType;
    if (day === undefined || mealType === undefined) {
      return;
    }

    // TODO: add ingredients to grocery list

    setMeals((prevMeals) => {
      const newMeals = [...prevMeals];
      newMeals[day] = {
        ...newMeals[day],
        [mealType]: meal,
      };
      return newMeals;
    });

    navigate("/home");
  }

  return (
    <section className="space-y-6 p-6">
      <div className="self-start">
        <BackButton />
      </div>
      <h1 className="text-3xl font-medium lowercase">meal options</h1>
      <div className="text-right text-sm text-black/70">
        0 of 7 days planned
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-200">
        <div className="h-2 rounded-full bg-black" style={{ width: "0%" }} />
      </div>

      {MEALS.map((meal) => (
        <MealOption
          key={meal.name}
          title={meal.name}
          tags={meal.tags}
          ingredients={meal.groceries}
          imageSrc={meal.imageSrc}
          onSelect={() => choose(meal)}
        />
      ))}
    </section>
  );
}
