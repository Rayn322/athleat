import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import "./index.css";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";
import Root from "./pages/Root.tsx";
import MealOptions from "./pages/MealOptions.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Root />} />
          <Route path="home" element={<Home />} />
          <Route path="MealOptions" element={<MealOptions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
