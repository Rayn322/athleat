import { useNavigate } from "react-router-dom";
import leafLogo from "../assets/icons/leafLogo.svg";
import { Button } from "../components/Button";
import BackButton from "../components/BackButton";

export default function Setup() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex h-[852px] w-[392px] flex-col bg-bg-white px-6 pt-[60px] pb-10">
      {/* Back button */}
      <div className="mb-10">
        <BackButton />
      </div>

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
