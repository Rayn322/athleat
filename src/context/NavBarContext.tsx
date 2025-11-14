//src/context/NavBarContext.tsx
import { createContext, useContext, useState } from "react";

type NavBarState = {
  useNotifCartIcon: boolean;
  setUseNotifCartIcon: (value: boolean) => void;
};

const NavBarContext = createContext<NavBarState | undefined>(undefined);

export function NavBarProvider({ children }: { children: React.ReactNode }) {
  const [useNotifCartIcon, setUseNotifCartIcon] = useState(false);

  return (
    <NavBarContext.Provider value={{ useNotifCartIcon, setUseNotifCartIcon }}>
      {children}
    </NavBarContext.Provider>
  );
}

export function useNavBar() {
  const ctx = useContext(NavBarContext);
  if (!ctx) throw new Error("useNavBar must be used inside a <NavBarProvider>");
  return ctx;
}
