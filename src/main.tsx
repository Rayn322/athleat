import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import "./index.css";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";
import Root from "./pages/Root.tsx";
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

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route index element={<Root />} handle={{
//             nav: {
//               show: true,
//               active: "home",
//               useNotifCartIcon: false,
//             },
//           }}/>
//           <Route path="analytics" element={<Analytics />} handle={{
//             nav: {
//               show: true,
//               active: "analytics",
//               useNotifCartIcon: false,
//             },
//           }}/>
//           <Route path="quickProteins" element={<QuickProteins />} />
//           <Route path="home" element={<Home />} />
//           <Route path="MealOptions" element={<MealOptions />} />
//           <Route path="Groceries1" element={<Groceries1 />} />
//           <Route path="Groceries2" element={<Groceries2 />} />
//           <Route path="Groceries3" element={<Groceries3 />} />
//           <Route path="Groceries4" element={<Groceries4 />} />
//           <Route path="GroceryList" element={<GroceryList />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>,
// );

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Root />, handle: { nav: { show: false } } },
      {
        path: "welcome",
        element: <Welcome />,
        handle: {
          nav: { show: false, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "create-account",
        element: <CreateAccount />,
        handle: {
          nav: { show: false, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "login",
        element: <Login />,
        handle: {
          nav: { show: false, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "home",
        element: <Home />,
        handle: {
          nav: { show: true, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "analytics",
        element: <Analytics />,
        handle: {
          nav: { show: true, active: "analytics", useNotifCartIcon: false },
        },
      },
      {
        path: "quickProteins",
        element: <QuickProteins />,
        handle: {
          nav: { show: true, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "MealOptions",
        element: <MealOptions />,
        handle: {
          nav: { show: true, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "Groceries1",
        element: <Groceries1 />,
        handle: {
          nav: { show: true, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "Groceries2",
        element: <Groceries2 />,
        handle: {
          nav: { show: true, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "Groceries3",
        element: <Groceries3 />,
        handle: {
          nav: { show: true, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "Groceries4",
        element: <Groceries4 />,
        handle: {
          nav: { show: true, active: "home", useNotifCartIcon: false },
        },
      },
      {
        path: "groceryListEmpty",
        element: <GroceryListEmpty />,
        handle: {
          nav: { show: true, active: "cart", useNotifCartIcon: false },
        },
      },
      {
        path: "groceryList",
        element: <GroceryList />,
        handle: {
          nav: { show: true, active: "cart", useNotifCartIcon: false },
        },
      },
      {
        path: "history",
        element: <History />,
        handle: {
          nav: { show: true, active: "analytics", useNotifCartIcon: false },
        },
      },
      {
        path: "profile",
        element: <Profile />,
        handle: {
          nav: { show: true, active: "analytics", useNotifCartIcon: false },
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
