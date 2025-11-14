import { Outlet } from "react-router";
import { NavBar } from "../components/NavBar";

export default function Layout() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="overflow-y-auto px-6 pt-[60px]">
        <Outlet />
      </div>
      <NavBar
        active="home"
        hrefs={{ home: "/home", analytics: "/", cart: "/grocerylist" }}
      />
    </div>
  );
}
