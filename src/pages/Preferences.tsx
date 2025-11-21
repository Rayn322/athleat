import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Undo2, Heart } from "lucide-react";
import BackButton from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";
import { SwipeCards, type SwipeCardRef } from "../components/SwipeCard";
import { usePreferences } from "../utils/localStorageHooks";

export default function Preferences({ initialSetup = false }: { initialSetup?: boolean }) {
  const navigate = useNavigate();
  const swipeRef = useRef<SwipeCardRef>(null);
  const [cardsRemaining, setCardsRemaining] = useState(3);

  const [prefs, setPrefs] = usePreferences();

  // RESET prefs only on first setup
  useEffect(() => {
    if (initialSetup) {
      setPrefs({ likedMeals: [], dislikedMeals: [] });
    }
  }, [initialSetup]);

  const handleCardsChange = (newCount) => {
    setCardsRemaining(newCount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-white px-9 pt-9 pb-10">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />

        <div className="flex items-center gap-4">
          <div className="w-[200px]">
            <ProgressBar value={3} max={3} height={9} />
          </div>

          <button
            onClick={() => navigate("/home")}
            className="text-black text-base font-normal"
          >
            skip
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="text-h1 font-normal text-black">
          select your meal preferences.
        </h1>
        <p className="text-small italic text-dark-gray">
          psst! you can edit this later.
        </p>
      </div>

      {/* Swipe Zone */}
      <div className="flex flex-col items-center justify-center">
        <div className="h-[460px] flex items-center justify-center">
          <SwipeCards ref={swipeRef} onCardsChange={handleCardsChange} />
        </div>

        {cardsRemaining === 0 && (
          <p className="text-sm italic text-gray-400 mt-4 mb-2">
            you’ve seen all the meals for now!
          </p>
        )}

        <div className="flex items-center justify-center gap-6 mt-4 mb-6">
          <button onClick={() => swipeRef.current?.swipeFront("left")}>
            <X className="w-[52px] h-[52px] text-black" />
          </button>

          <button onClick={() => swipeRef.current?.undoSwipe()}>
            <Undo2 className="w-[30px] h-[30px] text-black" />
          </button>

          <button onClick={() => swipeRef.current?.swipeFront("right")}>
            <Heart className="w-[52px] h-[52px] text-black" />
          </button>
        </div>

        <div className="w-full">
          <Button
            variant="primary"
            size="md"
            width="full"
            onClick={() => navigate("/home")}
          >
            get started!
          </Button>
        </div>
      </div>
    </div>
  );
}
