import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./pages/Layout.tsx";
import Other from "./pages/Other.tsx";
import Root from "./pages/Root.tsx";
import Analytics from "./pages/Analytics.tsx";
import QuickProteins from "./pages/QuickProteins.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Root />} />
          <Route path="other" element={<Other />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="quickProteins" element={<QuickProteins />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
