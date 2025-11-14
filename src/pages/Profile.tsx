import { Checkbox } from "../components/Checkbox";
import { ContactCard } from "../components/ContactCard";
import { ChevronLeft, SquarePen, Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
    const navigate = useNavigate();
    return (
        <div className="space-y-8">
            <div className="flex flex-row justify-between">
                <button
                    type="button"
                    onClick={() => navigate("/home")}
                >
                    <ChevronLeft className="h-6 w-6 text-black" />
                </button>
                <SquarePen className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-h1">your profile</h1>
            <div className="border-2 rounded-xl border-light-gray flex flex-row space-x-3 p-6">
                <img src="Images/sarah.png" className="h-20 w-20 rounded-4xl"/>
                <div>
                    <p className="text-h2 font-semibold">Sarah Smith</p>
                    <p className="text-base">Cuesta College | Swim & Dive</p>
                    <a className="text-base underline" href="/history">see history</a>
                </div>
            </div>
            <div className="space-y-4">
                <div className="border-b-2 pb-3 border-light-gray flex flex-row gap-3">
                    <Users className="h-6 w-6 text-black" />
                    <p className="text-h3">progress sharing</p>
                </div>
                <div className="flex flex-row gap-3">
                    <Checkbox />
                    <span className="text-base">sharing dietary progress</span>
                </div>
                <div className="flex flex-row space-x-3">
                    <ContactCard
                        name={"coach joel"}
                        company={"cuesta college"}
                    />
                    <ContactCard
                        name={"dr. johnson"}
                        company={"dietitian, doctor"}
                    />
                </div>
            </div>
            <div className="space-y-4 mb-5">
                <div className="border-b-2 pb-3 border-light-gray flex flex-row gap-3">
                    <User className="h-6 w-6 text-black" />
                    <p className="text-h3">personal information</p>
                </div>
                <div className="space-y-2">
                    <div className="flex flex-row gap-3">
                        <p className="text-base text-dark-gray w-40">diet goal:</p>
                        <p className="text-base text-black">maintain composition</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <p className="text-base text-dark-gray w-40">weight:</p>
                        <p className="text-base text-black">115 lbs</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <p className="text-base text-dark-gray w-40">height:</p>
                        <p className="text-base text-black">5ft 4in</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <p className="text-base text-dark-gray w-40">gender:</p>
                        <p className="text-base text-black">female</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <p className="text-base text-dark-gray w-40">age:</p>
                        <p className="text-base text-black">20</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <p className="text-base text-dark-gray w-40">sport:</p>
                        <p className="text-base text-black">swimming</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <p className="text-base text-dark-gray w-40">food restrictions:</p>
                        <p className="text-base text-black">peanuts, gluten-free</p>
                    </div>
                </div>
            </div>
        </div>
    );
}