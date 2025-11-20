import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} style={{ fontSize: "1.5rem" }}>
      ← Back
    </button>
  );
}
