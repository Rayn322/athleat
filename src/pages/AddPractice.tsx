import React from "react";
import { useNavigate } from "react-router-dom";
export default function AddPractice() {
  const navigate = useNavigate();
  // redirect to add-class but with query param
  React.useEffect(() => {
    navigate("/add-class?type=practice", { replace: true });
  }, [navigate]);
  return null;
}
