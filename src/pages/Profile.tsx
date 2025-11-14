import { Checkbox } from "../components/Checkbox";
import { ContactCard } from "../components/ContactCard";
import { ChevronLeft, SquarePen, Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div className="flex flex-row justify-between">
        <button type="button" onClick={() => navigate("/home")}>
          <ChevronLeft className="h-6 w-6 text-black" />
        </button>
        <SquarePen className="h-6 w-6 text-black" />
      </div>
      <h1 className="text-h1">your profile</h1>
      <div className="flex flex-row space-x-3 rounded-xl border-2 border-light-gray p-6">
        <img src="Images/sarah.png" className="h-20 w-20 rounded-4xl" />
        <div>
          <p className="text-h2 font-semibold">Sarah Smith</p>
          <p className="text-base">Cuesta College | Swim & Dive</p>
          <a className="text-base underline" href="/history">
            see history
          </a>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-row gap-3 border-b-2 border-light-gray pb-3">
          <Users className="h-6 w-6 text-black" />
          <p className="text-h3">progress sharing</p>
        </div>
        <div className="flex flex-row gap-3">
          <Checkbox />
          <span className="text-base">sharing dietary progress</span>
        </div>
        <div className="flex flex-row space-x-3">
          <ContactCard name={"coach joel"} company={"cuesta college"} />
          <ContactCard name={"dr. johnson"} company={"dietitian, doctor"} />
        </div>
      </div>
      <div className="mb-5 space-y-4">
        <div className="flex flex-row gap-3 border-b-2 border-light-gray pb-3">
          <User className="h-6 w-6 text-black" />
          <p className="text-h3">personal information</p>
        </div>
        <div className="space-y-2">
          <div className="flex flex-row gap-3">
            <p className="w-40 text-base text-dark-gray">diet goal:</p>
            <p className="text-base text-black">maintain composition</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="w-40 text-base text-dark-gray">weight:</p>
            <p className="text-base text-black">115 lbs</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="w-40 text-base text-dark-gray">height:</p>
            <p className="text-base text-black">5ft 4in</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="w-40 text-base text-dark-gray">gender:</p>
            <p className="text-base text-black">female</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="w-40 text-base text-dark-gray">age:</p>
            <p className="text-base text-black">20</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="w-40 text-base text-dark-gray">sport:</p>
            <p className="text-base text-black">swimming</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="w-40 text-base text-dark-gray">food restrictions:</p>
            <p className="text-base text-black">peanuts, gluten-free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
