import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./pages/Layout.tsx";
import Other from "./pages/Other.tsx";
import Root from "./pages/Root.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Root />} />
          <Route path="other" element={<Other />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
