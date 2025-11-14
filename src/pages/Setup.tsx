import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import leafLogo from "../assets/icons/leafLogo.svg";
import { Button } from "../components/Button";

export default function Setup() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex h-[852px] w-[392px] flex-col bg-bg-white px-6 pt-[60px] pb-10">
      {/* Back button */}
      <button className="mb-10" onClick={() => navigate("/create-account")}>
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Content wrapper */}
      <div className="flex flex-1 flex-col items-start gap-20">
        {/* Logo */}
        <img
          src={leafLogo}
          alt="Leaf Logo"
          className="h-[71.805px] w-[67.211px]"
        />

        {/* Text block */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="font-regular text-display leading-none text-black">
            fuel starts here.
          </h1>

          <p className="text-base leading-normal text-dark-gray">
            we’ll use your schedule, goals, and dietary info to personalize your
            meals.
          </p>
        </div>
      </div>

      {/* Button */}
      <Button
        variant="primary"
        size="md"
        width="full"
        onClick={() => navigate("/input-schedule")}
      >
        get started
      </Button>
    </div>
  );
}
