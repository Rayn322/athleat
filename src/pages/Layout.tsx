import { Outlet } from "react-router";
import { NavBar } from "../components/NavBar";

export default function Layout() {
  return (
<<<<<<< HEAD
    <div className="space-y-2 p-4">
      {/* <h1 className="text-2xl font-semibold">hello</h1> */}
      <Outlet />
=======
    <div className="flex h-dvh flex-col">
      <div className="overflow-y-auto px-6 pt-[60px]">
        <Outlet />
      </div>
      <NavBar
        active="home"
        hrefs={{ home: "/home", analytics: "/", cart: "/grocerylist" }}
      />
>>>>>>> origin/main
    </div>
  );
}
