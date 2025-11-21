import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import leafLogo from "../assets/icons/leafLogo.svg";
import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";
import { Tag } from "../components/Tag";
import { Checkbox } from "../components/Checkbox";
import { useUserMetrics } from "../utils/localStorageHooks";

export default function InputMetrics() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useUserMetrics();

  const dietaryOptions = ["build muscle", "maintain composition", "lose weight"];
  const [dietaryGoal, setDietaryGoal] = useState(metrics?.dietaryGoal ?? "maintain composition");

  const [heightFt, setHeightFt] = useState(metrics?.heightFt ?? "");
  const [heightIn, setHeightIn] = useState(metrics?.heightIn ?? "");
  const [weight, setWeight] = useState(metrics?.weight ?? "");
  const [weightUnit, setWeightUnit] = useState(metrics?.weightUnit ?? "lbs");
  const [gender, setGender] = useState(metrics?.gender ?? "female");
  const [age, setAge] = useState(metrics?.age ?? "");
  const [sport, setSport] = useState(metrics?.sport ?? "");
  const [college, setCollege] = useState(metrics?.college ?? "");

  const [foodRestrictions, setFoodRestrictions] = useState<string[]>(
    metrics?.foodRestrictions ?? []
  );
  const [newRestriction, setNewRestriction] = useState("");

  const [shareProgress, setShareProgress] = useState(metrics?.shareProgress ?? true);

  const maleDefault =
    "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?q=80&w=1160&auto=format&fit=crop";
  const femaleDefault =
    "https://plus.unsplash.com/premium_photo-1739786995552-0a2ccfa62ba5?q=80&w=1160&auto=format&fit=crop";

  function addFoodRestriction() {
    const trimmed = newRestriction.trim();
    if (trimmed && !foodRestrictions.includes(trimmed)) {
      setFoodRestrictions([trimmed, ...foodRestrictions]);
      setNewRestriction("");
    }
  }

  function saveAndGoNext() {
    const defaultPfp =
      metrics?.profilePic ??
      (gender === "male" ? maleDefault : femaleDefault);

    setMetrics({
      dietaryGoal,
      heightFt,
      heightIn,
      weight,
      weightUnit,
      gender,
      age,
      sport,
      foodRestrictions,
      shareProgress,
      college,
      profilePic: defaultPfp,
    });

    navigate("/preferences");
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-white px-9 pt-9 pb-10">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="w-[304px] shrink-0">
          <ProgressBar value={2} max={3} height={9} />
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <img src={leafLogo} className="w-[67px]" />
        <h1 className="text-h1">tell us a bit about yourself.</h1>
        <p className="text-small italic text-dark-gray">psst! you can edit this later.</p>
      </div>

      {/* Dietary Goals */}
      <div className="mt-4">
        <p className="mb-3 text-base">dietary goals</p>
        <div className="flex gap-3">
          {dietaryOptions.map((option) => {
            const selected = option === dietaryGoal;
            return (
              <button
                key={option}
                onClick={() => setDietaryGoal(option)}
                className={`px-2 py-[3px] rounded-[11px] ${
                  selected ? "bg-black text-white" : "bg-white border border-black"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* College */}
      <div className=" mt-9 gap-3">
        <p className="text-base text-black mb-2">college</p>
        <input
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          className="p-2 outline outline-light-gray rounded-xl w-60"
          placeholder="enter your college"
        />
      </div>

      {/* Metrics */}
      <div className="mt-9 flex flex-col gap-3">
        <p className="text-base mb-3">metrics</p>

        {/* Height */}
        <div className="flex items-center gap-4">
          <p className="w-[90px] text-dark-gray">height:</p>
          <input
            value={heightFt}
            onChange={(e) => setHeightFt(e.target.value)}
            className="w-12 p-2 outline outline-light-gray rounded-xl"
          />
          <span>ft</span>
          <input
            value={heightIn}
            onChange={(e) => setHeightIn(e.target.value)}
            className="w-12 p-2 outline outline-light-gray rounded-xl"
          />
          <span>in</span>
        </div>

        {/* Weight */}
        <div className="flex items-center gap-4">
          <p className="w-[90px] text-dark-gray">weight:</p>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-20 p-2 outline outline-light-gray rounded-xl"
          />
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="w-20 p-2 rounded-xl outline outline-light-gray"
          >
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-4">
          <p className="w-[90px] text-dark-gray">sex:</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-32 p-2 rounded-xl outline outline-light-gray"
          >
            <option>female</option>
            <option>male</option>
          </select>
        </div>

        {/* Age */}
        <div className="flex items-center gap-4">
          <p className="w-[90px] text-dark-gray">age:</p>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-20 p-2 outline outline-light-gray rounded-xl"
          />
        </div>

        {/* Sport */}
        <div className="flex items-center gap-4">
          <p className="w-[90px] text-dark-gray">sport:</p>
          <input
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="w-32 p-2 outline outline-light-gray rounded-xl"
            placeholder="enter sport"
          />
        </div>

        {/* Food Restrictions */}
        <div className="flex flex-col gap-2">
          <p className="w-[90px] text-dark-gray">food restrictions:</p>

          <div className="flex flex-wrap gap-2 items-center">
            {foodRestrictions.map((fr) => (
              <div
                key={fr}
                className="cursor-pointer"
                onClick={() =>
                  setFoodRestrictions(foodRestrictions.filter((r) => r !== fr))
                }
              >
                <Tag label={fr} variant="outline-black" className="px-2 py-1" />
              </div>
            ))}

            <input
              value={newRestriction}
              onChange={(e) => setNewRestriction(e.target.value)}
              className="p-2 outline outline-light-gray rounded-xl"
            />
            <button onClick={addFoodRestriction}>
              <CirclePlus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Share Progress */}
        <div className="flex items-center gap-3 mt-4">
          <Checkbox
            checked={shareProgress}
            onChange={(e) => setShareProgress(e.target.checked)}
          />
          <span className="text-dark-gray text-small">
            share dietary progress with others?
          </span>
        </div>
      </div>

      {/* NEXT */}
      <Button
        variant="primary"
        size="md"
        width="full"
        className="mt-6"
        onClick={saveAndGoNext}
      >
        next
      </Button>
    </div>
  );
}
