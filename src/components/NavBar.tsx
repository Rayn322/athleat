// src/components/NavBar.tsx

import * as React from "react";
import { House, ChartNoAxesColumn, ShoppingBasket } from "lucide-react";
import cartUrl from "../assets/icons/shopping-basket-notif.svg";
import cartActiveUrl from "../assets/icons/shopping-basket-notif-active.svg";

type Tab = "home" | "analytics" | "cart";

/** Notes
 * - hrefs: optional links for each tab (plain anchors; can swap to React Router later)
 * - onSelect: optional click handler to intercept navigation
 */
export type NavBarProps = {
  active: Tab;                       
  useNotifCartIcon?: boolean;        
  hrefs?: Partial<Record<Tab, string>>;
  onSelect?: (tab: Tab) => void;
  className?: string;
};

export function NavBar({
  active,
  useNotifCartIcon = false,
  hrefs,
  onSelect,
  className,
}: NavBarProps) {
  const color = (t: Tab) =>
    t === active
      ? "text-[color:var(--color-green-primary)]"
      : "text-black";

  const Item: React.FC<{
    tab: Tab;
    children: React.ReactNode;
    label: string;
  }> = ({ tab, children, label }) => {
    const common = (
      <span
        className="block p-2"
        aria-current={active === tab ? "page" : undefined}
        aria-label={label}
      >
        {children}
      </span>
    );

    // If hrefs provided, use <a>; else use <button>
    const href = hrefs?.[tab];
    if (href) {
      return (
        <a
          href={href}
          onClick={(e) => {
            onSelect?.(tab);
          }}
          className="select-none"
        >
          {common}
        </a>
      );
    }
    return (
      <button
        type="button"
        onClick={() => onSelect?.(tab)}
        className="select-none"
      >
        {common}
      </button>
    );
  };

  return (
    <nav
      className={[
        "fixed inset-x-0 bottom-0 z-50 bg-white border-t border-black", 
        className,
      ].join(" ")}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-[480px] h-16 px-[52px]">
        <ul className="flex h-full items-center justify-between">
          {/* Home */}
          <li>
            <Item tab="home" label="Home">
              <House className={`h-7 w-7 ${color("home")}`} />
            </Item>
          </li>

          {/* Analytics */}
          <li>
            <Item tab="analytics" label="Analytics">
              <ChartNoAxesColumn className={`h-7 w-7 ${color("analytics")}`} />
            </Item>
          </li>
          <li>
            <Item tab="cart" label="Cart">
              {useNotifCartIcon ? (
                <img
                  src={
                    active === "cart"
                      ? cartActiveUrl
                      : cartUrl
                  }
                  alt="Cart"
                  className="h-7 w-7"
                  draggable={false}
                />
              ) : (
                <ShoppingBasket className={`h-7 w-7 ${color("cart")}`} />
              )}
            </Item>
          </li>
        </ul>
      </div>
    </nav>
  );
}
