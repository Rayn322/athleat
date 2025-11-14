import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.svg";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/create-account")}
      className="flex h-screen w-screen flex-col items-center justify-center bg-bg-white cursor-pointer"
    >
      <img
        src={logo}
        alt="Athleat Logo"
        className="h-32 w-32 opacity-90"
      />

      <p className="mt-6 text-small text-dark-gray italic">
        tap anywhere to continue
      </p>
    </div>
  );
}
