import React, { useState } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import leafLogo from "../assets/icons/leafLogo.svg";
import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";
import { Tag } from "../components/Tag";
import { Checkbox } from "../components/Checkbox";

export default function InputMetrics() {
  const navigate = useNavigate();

  // Dietary goals
  const dietaryOptions = ["build muscle", "maintain composition", "lose weight"];
  const [dietaryGoal, setDietaryGoal] = useState("maintain composition");

  // Metrics
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("");
  const [sport, setSport] = useState("");

  // Food restrictions
  const [foodRestrictions, setFoodRestrictions] = useState<string[]>([]);
  const [newRestriction, setNewRestriction] = useState("");

  // Checkbox for sharing dietary progress
  const [shareProgress, setShareProgress] = useState(true);

  function addFoodRestriction() {
    const trimmed = newRestriction.trim();
    if (trimmed && !foodRestrictions.includes(trimmed)) {
      setFoodRestrictions([trimmed, ...foodRestrictions]);
      setNewRestriction("");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-white px-9 pt-9 pb-10">
      {/* Top Row: Back + Progress */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="w-[304px] shrink-0">
          <ProgressBar value={2} max={3} height={9} />
        </div>
      </div>

      {/* Logo + Title */}
      <div className="flex flex-col gap-3 mb-6">
        <img src={leafLogo} alt="Leaf Logo" className="w-[67.2px] h-[71.8px]" />
        <h1 className="text-h1 font-normal text-black">tell us a bit about yourself.</h1>
        <p className="text-small italic text-dark-gray">psst! you can edit this later.</p>
      </div>

      {/* Dietary Goals */}
      <div className="mt-9">
        <div className="text-base text-black mb-3">dietary goals</div>
        <div className="flex gap-3">
          {dietaryOptions.map((option) => {
            const selected = option === dietaryGoal;
            return (
              <button
                key={option}
                onClick={() => setDietaryGoal(option)}
                className={`flex justify-center items-center gap-2 rounded-[11px] px-2 py-[3px] ${
                  selected
                    ? "bg-black text-white"
                    : "bg-white border border-black text-black"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-9 flex flex-col gap-3">
        <div className="text-base text-black mb-3">metrics</div>

        {/* Height */}
        <div className="flex items-center gap-4">
          <div className="w-[90px] text-dark-gray text-base">height:</div>
          <div className="flex gap-2">
            <input
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              placeholder=""
              className="w-12 p-2 outline outline-light-gray rounded-xl text-black text-base"
            />
            <span className="self-center">ft</span>
            <input
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              placeholder=""
              className="w-12 p-2 outline outline-light-gray rounded-xl text-black text-base"
            />
            <span className="self-center">in</span>
          </div>
        </div>

        {/* Weight */}
        <div className="flex items-center gap-4">
          <div className="w-[90px] text-dark-gray text-base">weight:</div>
          <div className="flex gap-2">
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder=""
              className="w-20 p-2 outline outline-light-gray rounded-xl text-black text-base"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="w-20 p-2 rounded-xl outline outline-light-gray text-black text-base"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-4">
          <div className="w-[90px] text-dark-gray text-base">sex:</div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-32 p-2 rounded-xl outline outline-light-gray text-black text-base"
          >
            <option>female</option>
            <option>male</option>
          </select>
        </div>

        {/* Age */}
        <div className="flex items-center gap-4">
          <div className="w-[90px] text-dark-gray text-base">age:</div>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder=""
            className="w-20 p-2 outline outline-light-gray rounded-xl text-black text-base"
          />
        </div>

        {/* Sport */}
        <div className="flex items-center gap-4">
          <div className="w-[90px] text-dark-gray text-base">sport:</div>
          <input
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            placeholder="enter sport"
            className="w-32 p-2 outline outline-light-gray rounded-xl text-black text-base"
          />
        </div>

        {/* Food Restrictions */}
        <div className="flex flex-col gap-2">
        <div className="w-[90px] text-dark-gray text-base">food restrictions:</div>
        <div className="flex flex-wrap gap-2 items-center">
            {foodRestrictions.map((fr) => (
            <div
                key={fr}
                className="cursor-pointer"
                onClick={() =>
                setFoodRestrictions(foodRestrictions.filter((r) => r !== fr))
                }
            >
                <Tag
                label={fr}
                variant="outline-black"
                className="text-small px-2 py-1"
                />
            </div>
            ))}
            <input
            value={newRestriction}
            onChange={(e) => setNewRestriction(e.target.value)}
            placeholder=""
            className="p-2 outline outline-light-gray rounded-xl text-black text-base"
            />
            <button onClick={addFoodRestriction}>
            <CirclePlus className="w-6 h-6 text-black" />
            </button>
        </div>
        </div>

        {/* Checkbox for sharing dietary progress */}
        <div className="flex items-center gap-3 mt-4">
          <Checkbox defaultChecked={shareProgress} />
          <span className="text-dark-gray text-small font-medium">
            would you like to opt in to share your dietary progress with others?
          </span>
        </div>
      </div>

      {/* NEXT Button */}
      <div className="mt-6 w-full">
        <Button
          variant="primary"
          size="md"
          width="full"
          onClick={() => navigate("/preferences")}
        >
          next
        </Button>
      </div>
    </div>
  );
}
