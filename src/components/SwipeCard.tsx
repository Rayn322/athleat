import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MealOption } from "./MealOption";

type CardData = {
  id: number;
  title: string;
  imageSrc: string;
  tags?: string[];
  ingredients?: string[];
};

const sampleCards: CardData[] = [
  {
    id: 1,
    title: "cheeseburger",
    imageSrc:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop&q=60",
    tags: ["high protein", "carbs"],
    ingredients: ["beef", "cheese", "bun"],
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
    title: "salad",
    imageSrc:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&auto=format&fit=crop&q=60",
    tags: ["low calorie", "vegan"],
    ingredients: ["lettuce", "tomato", "lemon"],
  },
];

export function SwipeCards() {
  const [cards, setCards] = useState(sampleCards);
  const [likes, setLikes] = useState<{ [id: number]: "like" | "dislike" }>({});

  const handleSwipe = (id: number, direction: "left" | "right") => {
    setLikes((prev) => ({
      ...prev,
      [id]: direction === "right" ? "like" : "dislike",
    }));
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="relative h-[450px] w-[320px]">
        {cards.map((card, index) => (
          <SwipeableCard
            key={card.id}
            {...card}
            onSwipe={handleSwipe}
            isFront={index === cards.length - 1}
          />
        ))}
      </div>

      <div className="text-center text-sm text-gray-600">
        {Object.entries(likes).length === 0 && (
          <p>Swipe cards to like/dislike</p>
        )}
        {Object.entries(likes).map(([id, result]) => (
          <p key={id}>
            Card {id}: {result}
          </p>
        ))}
      </div>
    </div>
  );
}

type SwipeableCardProps = CardData & {
  onSwipe: (id: number, direction: "left" | "right") => void;
  isFront: boolean;
};

function SwipeableCard({
  id,
  title,
  imageSrc,
  tags = [],
  ingredients = [],
  onSwipe,
  isFront,
}: SwipeableCardProps) {
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
    >
      <div className="flex h-[420px] w-[300px] flex-col overflow-hidden rounded-2xl border-2 border-light-gray bg-white shadow-lg">
        {/* Image */}
        <div className="h-[250px] w-full overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
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
}
