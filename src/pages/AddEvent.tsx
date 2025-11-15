import React from "react";
import { useNavigate } from "react-router-dom";
export default function AddEvent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/add-class?type=event", { replace: true });
  }, [navigate]);
  return null;
}
