import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { MealOption } from "./MealOption";
import { usePreferences } from "../utils/localStorageHooks";

export type CardData = {
  id: number;
  title: string;
  imageSrc: string;
  tags?: string[];
  ingredients?: string[];
};

// SAMPLE DATA
const sampleCards: CardData[] = [
  {
    id: 1,
    title: "yogurt",
    imageSrc:
      "https://images.unsplash.com/photo-1571212515416-fef01fc43637?q=80&w=682&auto=format&fit=crop",
    tags: ["dairy"],
    ingredients: ["milk", "fruit", "granola"],
  },
  {
    id: 2,
    title: "pasta",
    imageSrc:
      "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1600&auto=format&fit=crop&q=60",
    tags: ["carbs", "Vegetarian"],
    ingredients: ["noodles", "tomato", "basil"],
  },
  {
    id: 3,
    title: "avocado toast",
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1676106623583-e68dd66683e3?q=80&w=687&auto=format&fit=crop",
    tags: ["healthy fats", "vegetarian"],
    ingredients: ["avocado", "bread", "eggs"],
  },
  { id: 4, title: "chicken salad", imageSrc: "https://images.unsplash.com/photo-1580013759032-c96505e24c1f?q=80&w=1209&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["protein"], ingredients: ["chicken", "lettuce", "tomato"] },
  { id: 5, title: "smoothie bowl", imageSrc: "https://images.unsplash.com/photo-1590301157411-8686d4a34f10?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["fruit", "vegan"], ingredients: ["banana", "berries", "almond milk"] },
  { id: 6, title: "omelette", imageSrc: "https://plus.unsplash.com/premium_photo-1667807521536-bc35c8d8b64b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["protein", "breakfast"], ingredients: ["eggs", "cheese", "spinach"] },
  { id: 7, title: "grilled cheese", imageSrc: "https://plus.unsplash.com/premium_photo-1739906794633-71adada97314?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["comfort food", "vegetarian"], ingredients: ["bread", "cheese", "butter"] },
  { id: 8, title: "fruit salad", imageSrc: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["vegan", "healthy"], ingredients: ["apple", "orange", "grapes"] },
  { id: 9, title: "beef stir-fry", imageSrc: "https://images.unsplash.com/photo-1760504526069-ff0f8bf6e4ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["protein"], ingredients: ["beef", "broccoli", "soy sauce"] },
  { id: 10, title: "quinoa bowl", imageSrc: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["vegan", "carbs"], ingredients: ["quinoa", "chickpeas", "spinach"] },
  { id: 11, title: "turkey sandwich", imageSrc: "https://plus.unsplash.com/premium_photo-1664472757995-3260cd26e477?q=80&w=1361&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["protein"], ingredients: ["turkey", "bread", "lettuce"] },
  { id: 12, title: "pancakes", imageSrc: "https://images.unsplash.com/photo-1612182062633-9ff3b3598e96?q=80&w=719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["breakfast", "carbs"], ingredients: ["flour", "milk", "egg"] },
  { id: 13, title: "veggie wrap", imageSrc: "https://plus.unsplash.com/premium_photo-1664648119281-d0a5dfc8cae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["vegan"], ingredients: ["tortilla", "lettuce", "tomato"] },
  { id: 14, title: "salmon sushi", imageSrc: "https://images.unsplash.com/photo-1744360515510-db7bf0f6def8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["seafood"], ingredients: ["rice", "salmon", "nori"] },
  { id: 15, title: "mac and cheese", imageSrc: "https://images.unsplash.com/photo-1667499989723-c4ab9549d63c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["comfort food", "carbs"], ingredients: ["pasta", "cheese", "milk"] },
  { id: 16, title: "caesar salad", imageSrc: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["healthy"], ingredients: ["lettuce", "croutons", "parmesan"] },
  { id: 17, title: "shrimp tacos", imageSrc: "https://images.unsplash.com/photo-1611250188496-e966043a0629?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["seafood"], ingredients: ["shrimp", "tortilla", "cabbage"] },
  { id: 18, title: "chili", imageSrc: "https://images.unsplash.com/photo-1638329389022-daef2efb71b3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["protein", "spicy"], ingredients: ["beans", "beef", "tomato"] },
  { id: 19, title: "banana bread", imageSrc: "https://images.unsplash.com/photo-1632931057819-4eefffa8e007?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["carbs", "dessert"], ingredients: ["banana", "flour", "sugar"] },
  { id: 20, title: "caprese salad", imageSrc: "https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["vegetarian"], ingredients: ["tomato", "mozzarella", "basil"] },
  { id: 21, title: "tofu stir-fry", imageSrc: "https://plus.unsplash.com/premium_photo-1695151833063-a81c6772de96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["vegan", "protein"], ingredients: ["tofu", "broccoli", "soy sauce"] },
  { id: 22, title: "grilled salmon", imageSrc: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["seafood", "protein"], ingredients: ["salmon", "lemon", "herbs"] },
  { id: 23, title: "french toast", imageSrc: "https://plus.unsplash.com/premium_photo-1663840190874-8e378158dca8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["breakfast", "carbs"], ingredients: ["bread", "egg", "milk"] },
  { id: 24, title: "veggie burger", imageSrc: "https://plus.unsplash.com/premium_photo-1664648063548-50808d58f061?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["vegetarian"], ingredients: ["bun", "veggie patty", "lettuce"] },
];

export type SwipeCardRef = {
  swipeFront: (direction: "left" | "right") => void;
  undoSwipe: () => void;
};

export const SwipeCards = forwardRef<
  SwipeCardRef,
  { onCardsChange?: (n: number) => void }
>(({ onCardsChange }, ref) => {
  const [prefs, setPrefs] = usePreferences();

  // Filter out swiped meals
  const filteredCards = sampleCards.filter(
    (c) =>
      !prefs.likedMeals.some((m) => m.id === c.id) &&
      !prefs.dislikedMeals.some((m) => m.id === c.id)
  );

  // This local state represents the cards being swiped
  const [cards, setCards] = useState<CardData[]>(filteredCards);

  // For undo
  const [history, setHistory] = useState<
    { card: CardData; direction: "left" | "right" }[]
  >([]);

  const cardControls = useRef<{ [key: number]: any }>({});

  // Track initial mount to prevent infinite loops
  const initialMount = useRef(true);

  // Detect when prefs have been RESET externally (initial setup or edit reset)
  const prevPrefsRef = useRef(prefs);

  useEffect(() => {
    const prev = prevPrefsRef.current;

    const prefsWereNonEmpty =
      prev.likedMeals.length > 0 || prev.dislikedMeals.length > 0;

    const prefsNowEmpty =
      prefs.likedMeals.length === 0 && prefs.dislikedMeals.length === 0;

    // CONDITION: Only reset cards if preferences were cleared externally
    if (
      (prefsWereNonEmpty && prefsNowEmpty) || // reset scenario
      initialMount.current // first load
    ) {
      initialMount.current = false;

      setCards(filteredCards);
      setHistory([]);
      cardControls.current = {};
      onCardsChange?.(filteredCards.length);
    }

    prevPrefsRef.current = prefs;
  }, [prefs, filteredCards, onCardsChange]);

  // Notify parent when number of cards changes
  useEffect(() => {
    onCardsChange?.(cards.length);
  }, [cards, onCardsChange]);

  // Utility to avoid duplicates
  const addUnique = (arr, card) =>
    arr.some((m) => m.id === card.id) ? arr : [...arr, card];

  // SWIPE LOGIC
  const handleSwipe = (id, direction) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;

    // Update preferences
    if (direction === "right") {
      setPrefs((prev) => ({
        ...prev,
        likedMeals: addUnique(prev.likedMeals, card),
      }));
    } else {
      setPrefs((prev) => ({
        ...prev,
        dislikedMeals: addUnique(prev.dislikedMeals, card),
      }));
    }

    // Store for undo
    setHistory((prev) => [{ card, direction }, ...prev]);

    // Remove card from active list
    setCards((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      return updated;
    });
  };

  // PROGRAMMATIC SWIPE
  const swipeFront = (direction) => {
    if (cards.length === 0) return;
    const frontCard = cards[cards.length - 1];
    const controls = cardControls.current[frontCard.id];

    if (controls) {
      controls
        .start({
          x: direction === "right" ? 500 : -500,
          rotate: direction === "right" ? 15 : -15,
          opacity: 0,
          transition: { duration: 0.3 },
        })
        .then(() => handleSwipe(frontCard.id, direction));
    }
  };

  // UNDO SWIPE
  const undoSwipe = () => {
    if (history.length === 0) return;

    const last = history[0];

    setCards((prev) => [...prev, last.card]);
    setHistory((prev) => prev.slice(1));
  };

  useImperativeHandle(ref, () => ({
    swipeFront,
    undoSwipe,
  }));

  return (
    <div className="relative h-[450px] w-[320px]">
      <AnimatePresence>
        {cards.map((card, index) => (
          <SwipeableCard
            key={card.id}
            {...card}
            onSwipe={handleSwipe}
            isFront={index === cards.length - 1}
            controlsRef={(controls) =>
              (cardControls.current[card.id] = controls)
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

// SINGLE CARD
const SwipeableCard = ({
  id,
  title,
  imageSrc,
  tags = [],
  ingredients = [],
  onSwipe,
  isFront,
  controlsRef,
}) => {
  const controls = useAnimation();
  controlsRef(controls);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const handleDragEnd = () => {
    if (x.get() > 100) onSwipe(id, "right");
    else if (x.get() < -100) onSwipe(id, "left");
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ x, rotate, opacity, zIndex: isFront ? 10 : 0 }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
    >
      <div className="flex h-[420px] w-[300px] flex-col overflow-hidden rounded-2xl border-2 border-light-gray bg-white shadow-lg">
        <div className="h-[250px] w-full overflow-hidden">
          <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 items-center justify-center p-3">
          <MealOption
            title={title}
            imageSrc={imageSrc}
            tags={tags}
            ingredients={ingredients}
            showImage={false}
            className="border-none p-0 text-center text-gray-800 shadow-none"
          />
        </div>
      </div>
    </motion.div>
  );
};
