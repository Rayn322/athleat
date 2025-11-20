import type { Meal } from "../types/localStorage";

export const MEALS: Meal[] = [
  {
    name: "Cheeseburger",
    calories: 600,
    tags: ["high protein", "carbs"],
    groceries: ["Bread", "Patty", "Lettuce", "Tomato", "Cheese", "Pickles"],
    imageSrc: "/Images/burger.jpg",
    completed: false
  },
  {
    name: "Veggie Bowl",
    calories: 450,
    tags: ["vegetarian"],
    groceries: ["Rice", "Beans", "Corn", "Salsa", "Avocado"],
    imageSrc: "/Images/veggie.jpg",
    completed: false
  },
  {
    name: "Salmon",
    calories: 600,
    tags: ["high protein"],
    groceries: ["Rice", "Beans", "Corn", "Salsa", "Avocado"],
    imageSrc: "/Images/salmon.jpg",
    completed: false
  },
  {
    name: "Salad",
    calories: 450,
    tags: ["vegetarian"],
    groceries: ["Rice", "Beans", "Corn", "Salsa", "Avocado"],
    imageSrc: "/Images/salad.jpg",
    completed: false
  },
  {
    name: "Teriyaki Chicken",
    calories: 600,
    tags: ["high protein"],
    groceries: ["Rice", "Beans", "Corn", "Salsa", "Avocado"],
    imageSrc: "/Images/chicken.jpg",
    completed: false
  },
];
