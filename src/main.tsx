import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import "./index.css";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";
import Testing from "./pages/Testing.tsx";
import Analytics from "./pages/Analytics.tsx";
import QuickProteins from "./pages/QuickProteins.tsx";
import MealOptions from "./pages/MealOptions.tsx";
import Groceries1 from "./pages/Groceries1.tsx";
import Groceries2 from "./pages/Groceries2.tsx";
import Groceries3 from "./pages/Groceries3.tsx";
import Groceries4 from "./pages/Groceries4.tsx";
import GroceryListEmpty from "./pages/GroceryListEmpty.tsx";
import GroceryList from "./pages/GroceryList.tsx";
import History from "./pages/History.tsx";
import Profile from "./pages/Profile.tsx";
import Welcome from "./pages/Welcome.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import Login from "./pages/Login.tsx";
import Setup from "./pages/Setup.tsx";
import InputSchedule from "./pages/InputSchedule.tsx";
import AddClass from "./pages/AddClass.tsx";
import AddPractice from "./pages/AddPractice.tsx";
import AddEvent from "./pages/AddEvent.tsx";
import InputMetrics from "./pages/InputMetrics.tsx";
import Preferences from "./pages/Preferences.tsx";

const router = createBrowserRouter([
  {
    index: true,
    element: <Welcome />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "create-account",
    element: <CreateAccount />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "setup",
    element: <Setup />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "input-schedule",
    element: <InputSchedule />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "add-class",
    element: <AddClass />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "add-practice",
    element: <AddPractice />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "add-event",
    element: <AddEvent />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "input-metrics",
    element: <InputMetrics />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "preferences",
    element: <Preferences />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    path: "login",
    element: <Login />,
    handle: { nav: { tab: "home", useNotifCartIcon: false } },
  },
  {
    element: <Layout />,
    children: [
      { path: "testing", element: <Testing /> },
      {
        path: "home",
        element: <Home />,
        handle: { nav: { tab: "home", useNotifCartIcon: false } },
      },
      {
        path: "analytics",
        element: <Analytics />,
        handle: { nav: { tab: "analytics", useNotifCartIcon: false } },
      },
      {
        path: "quickProteins",
        element: <QuickProteins />,
        handle: { nav: { tab: "home", useNotifCartIcon: false } },
      },
      {
        path: "MealOptions",
        element: <MealOptions />,
        handle: { nav: { tab: "home", useNotifCartIcon: false } },
      },
      {
        path: "Groceries1",
        element: <Groceries1 />,
        handle: { nav: { tab: "home", useNotifCartIcon: false } },
      },
      {
        path: "Groceries2",
        element: <Groceries2 />,
        handle: { nav: { tab: "home", useNotifCartIcon: false } },
      },
      {
        path: "Groceries3",
        element: <Groceries3 />,
        handle: { nav: { tab: "home", useNotifCartIcon: false } },
      },
      {
        path: "Groceries4",
        element: <Groceries4 />,
        handle: { nav: { tab: "home", useNotifCartIcon: false } },
      },
      {
        path: "groceryListEmpty",
        element: <GroceryListEmpty />,
        handle: { nav: { tab: "cart", useNotifCartIcon: false } },
      },
      {
        path: "groceryList",
        element: <GroceryList />,
        handle: { nav: { tab: "cart", useNotifCartIcon: false } },
      },
      {
        path: "history",
        element: <History />,
        handle: { nav: { tab: "analytics", useNotifCartIcon: false } },
      },
      {
        path: "profile",
        element: <Profile />,
        handle: { nav: { tab: "analytics", useNotifCartIcon: false } },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
