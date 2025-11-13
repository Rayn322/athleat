import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";
import Root from "./pages/Root.tsx";
import MealOptions from "./pages/MealOptions.tsx";
import Groceries1 from "./pages/Groceries1.tsx";
import Groceries2 from "./pages/Groceries2.tsx";
import Groceries3 from "./pages/Groceries3.tsx";
import Groceries4 from "./pages/Groceries4.tsx";
import GroceryList from "./pages/GroceryList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Root />} />
          <Route path="home" element={<Home />} />
          <Route path="MealOptions" element={<MealOptions />} />
          <Route path="Groceries1" element={<Groceries1 />} />
          <Route path="Groceries2" element={<Groceries2 />} />
          <Route path="Groceries3" element={<Groceries3 />} />
          <Route path="Groceries4" element={<Groceries4 />} />
          <Route path="GroceryList" element={<GroceryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
