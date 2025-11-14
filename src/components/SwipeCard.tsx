import React, { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from "framer-motion";
import { MealOption } from "./MealOption";

export type CardData = {
  id: number;
  title: string;
  imageSrc: string;
  tags?: string[];
  ingredients?: string[];
};

const sampleCards: CardData[] = [
  { id: 1, title: "yogurt", imageSrc: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?q=80&w=682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["dairy"], ingredients: ["milk", "fruit", "granola"] },
  { id: 2, title: "pasta", imageSrc: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1600&auto=format&fit=crop&q=60", tags: ["carbs", "Vegetarian"], ingredients: ["noodles", "tomato", "basil"] },
  { id: 3, title: "avocado toast", imageSrc: "https://plus.unsplash.com/premium_photo-1676106623583-e68dd66683e3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["healthy fats", "vegetarian"], ingredients: ["avocado", "bread", "eggs"] },
];

export type SwipeCardRef = {
  swipeFront: (direction: "left" | "right") => void;
  undoSwipe: () => void;
};

export const SwipeCards = forwardRef<SwipeCardRef>((_, ref) => {
  const [cards, setCards] = useState<CardData[]>(sampleCards);
  const [history, setHistory] = useState<{ card: CardData; direction: "left" | "right" }[]>([]);
  const cardControls = useRef<{ [key: number]: any }>({});

  const handleSwipe = (id: number, direction: "left" | "right") => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;

    setHistory((prev) => [{ card, direction }, ...prev]);
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const swipeFront = (direction: "left" | "right") => {
    if (cards.length === 0) return;
    const frontCard = cards[cards.length - 1];
    const controls = cardControls.current[frontCard.id];
    if (controls) {
      controls.start({
        x: direction === "right" ? 500 : -500,
        rotate: direction === "right" ? 15 : -15,
        opacity: 0,
        transition: { duration: 0.3 },
      }).then(() => handleSwipe(frontCard.id, direction));
    }
  };

  const undoSwipe = () => {
    if (history.length === 0) return;
    const last = history[0];
    setCards((prev) => [...prev, last.card]);
    setHistory((prev) => prev.slice(1));
  };

  useImperativeHandle(ref, () => ({ swipeFront, undoSwipe }));

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="relative h-[450px] w-[320px]">
        <AnimatePresence>
          {cards.map((card, index) => (
            <SwipeableCard
              key={card.id}
              {...card}
              onSwipe={handleSwipe}
              isFront={index === cards.length - 1}
              controlsRef={(controls) => (cardControls.current[card.id] = controls)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

type SwipeableCardProps = CardData & {
  onSwipe: (id: number, direction: "left" | "right") => void;
  isFront: boolean;
  controlsRef: (controls: any) => void;
};

const SwipeableCard = forwardRef<any, SwipeableCardProps>(
  ({ id, title, imageSrc, tags = [], ingredients = [], onSwipe, isFront, controlsRef }, ref) => {
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
        ref={ref}
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
  }
);
