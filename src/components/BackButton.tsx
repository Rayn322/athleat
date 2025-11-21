import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 text-base font-medium hover:underline"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      <span>back</span>
    </button>
  );
}
