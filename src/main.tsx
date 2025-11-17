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

const routes = createRoutesFromElements(
  <>
    <Route
      index
      element={<Welcome />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="create-account"
      element={<CreateAccount />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="setup"
      element={<Setup />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="input-schedule"
      element={<InputSchedule />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="add-class"
      element={<AddClass />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="add-practice"
      element={<AddPractice />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="add-event"
      element={<AddEvent />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="input-metrics"
      element={<InputMetrics />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="preferences"
      element={<Preferences />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route
      path="login"
      element={<Login />}
      handle={{
        nav: { active: "home", useNotifCartIcon: false },
      }}
    />
    <Route element={<Layout />}>
      <Route path="testing" element={<Testing />} />
      <Route
        path="home"
        element={<Home />}
        handle={{
          nav: { active: "home", useNotifCartIcon: false },
        }}
      />
      <Route
        path="analytics"
        element={<Analytics />}
        handle={{
          nav: { active: "analytics", useNotifCartIcon: false },
        }}
      />
      <Route
        path="quickProteins"
        element={<QuickProteins />}
        handle={{
          nav: { active: "home", useNotifCartIcon: false },
        }}
      />
      <Route
        path="MealOptions"
        element={<MealOptions />}
        handle={{
          nav: { active: "home", useNotifCartIcon: false },
        }}
      />
      <Route
        path="Groceries1"
        element={<Groceries1 />}
        handle={{
          nav: { active: "home", useNotifCartIcon: false },
        }}
      />
      <Route
        path="Groceries2"
        element={<Groceries2 />}
        handle={{
          nav: { active: "home", useNotifCartIcon: false },
        }}
      />
      <Route
        path="Groceries3"
        element={<Groceries3 />}
        handle={{
          nav: { active: "home", useNotifCartIcon: false },
        }}
      />
      <Route
        path="Groceries4"
        element={<Groceries4 />}
        handle={{
          nav: { active: "home", useNotifCartIcon: false },
        }}
      />
      <Route
        path="groceryListEmpty"
        element={<GroceryListEmpty />}
        handle={{
          nav: { active: "cart", useNotifCartIcon: false },
        }}
      />
      <Route
        path="groceryList"
        element={<GroceryList />}
        handle={{
          nav: { active: "cart", useNotifCartIcon: false },
        }}
      />
      <Route
        path="history"
        element={<History />}
        handle={{
          nav: { active: "analytics", useNotifCartIcon: false },
        }}
      />
      <Route
        path="profile"
        element={<Profile />}
        handle={{
          nav: { tab: "analytics", useNotifCartIcon: false },
        }}
      />
    </Route>
  </>,
);

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
