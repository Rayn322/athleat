import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X, Undo2, Heart } from "lucide-react";
import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";
import { SwipeCards, type SwipeCardRef } from "../components/SwipeCard";

export default function Preferences() {
  const navigate = useNavigate();
  const swipeRef = useRef<SwipeCardRef>(null);

  return (
    <div className="flex flex-col min-h-screen bg-bg-white px-9 pt-9 pb-10">
      {/* Top Row: Back + Progress + Skip */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
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

      {/* Title + Subtitle */}
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="text-h1 font-normal text-black">
          select your meal preferences.
        </h1>
        <p className="text-small italic text-dark-gray">
          psst! you can edit this later.
        </p>
      </div>

      {/* Swipe Cards */}
      <div className="flex flex-col items-center justify-center">
        <SwipeCards ref={swipeRef} />

        {/* Swipe Action Buttons */}
        <div className="flex items-center justify-center gap-6 mt-6 mb-6">
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

        {/* Get Started Button */}
        <div className="mt-6 w-full">
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
