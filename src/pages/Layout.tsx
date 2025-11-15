import { Outlet, useMatches } from "react-router";
import { NavBar } from "../components/NavBar";
import { NavBarProvider, useNavBar } from "../context/NavBarContext";

type Tab = "home" | "analytics" | "cart";
type NavHandle = {
  nav?: {
    show?: boolean;
    active?: Tab;
    useNotifCartIcon?: boolean;
  };
};

function LayoutInner() {
  const matches = useMatches();
  const { useNotifCartIcon } = useNavBar();

  // Get the deepest matched route that has a handle.nav
  const navHandle = (
    [...matches].reverse().find((m) => (m.handle as NavHandle)?.nav)
      ?.handle as NavHandle
  )?.nav ?? { show: true, active: "home", useNotifCartIcon: false };

  return (
    <div className="flex h-dvh flex-col justify-between">
      <div className="overflow-y-auto px-6 pt-[60px]">
        <Outlet />
      </div>
      {navHandle.show && (
        <NavBar
          active={navHandle.active!}
          useNotifCartIcon={useNotifCartIcon}
          hrefs={{
            home: "/home",
            analytics: "/analytics",
            cart: "/groceryListEmpty",
          }}
        />
      )}
    </div>
  );
}

export default function Layout() {
  return (
    <NavBarProvider>
      <LayoutInner />
    </NavBarProvider>
  );
}
