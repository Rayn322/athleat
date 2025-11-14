import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import leafLogo from "../assets/icons/leafLogo.svg";
import { Button } from "../components/Button";

export default function Setup() {
  const navigate = useNavigate();

  return (
    <div className="flex w-[392px] h-[852px] flex-col px-6 pt-[60px] pb-10 bg-bg-white mx-auto">

      {/* Back button */}
      <button
        className="mb-10"
        onClick={() => navigate("/create-account")}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Content wrapper */}
      <div className="flex flex-col items-start gap-20 flex-1">

        {/* Logo */}
        <img
          src={leafLogo}
          alt="Leaf Logo"
          className="w-[67.211px] h-[71.805px]"
        />

        {/* Text block */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-display font-regular text-black leading-none">
            fuel starts here.
          </h1>

          <p className="text-base text-dark-gray leading-normal">
            we’ll use your schedule, goals, and dietary info to personalize your meals.
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
