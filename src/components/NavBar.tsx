// src/components/NavBar.tsx
import * as React from "react";
import clsx from "clsx";
import { House, ChartNoAxesColumn, ShoppingBasket } from "lucide-react";
import cartUrl from "../assets/icons/shopping-basket-notif.svg?url";
import cartActiveUrl from "../assets/icons/shopping-basket-notif-active.svg?url";

type Tab = "home" | "analytics" | "cart";

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
    t === active ? "text-[color:var(--color-green-primary)]" : "text-black";

  const Item: React.FC<{
    tab: Tab;
    label: string;
    children: React.ReactNode;
  }> = ({ tab, label, children }) => {
    const href = hrefs?.[tab];
    const content = (
      <span
        className="grid h-16 place-items-center px-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-green-primary)]/40 rounded-lg"
        aria-current={active === tab ? "page" : undefined}
      >
        {children}
        <span className="sr-only">{label}</span>
      </span>
    );

    return href ? (
      <a
        href={href}
        className="select-none"
        aria-label={label}
        onClick={() => onSelect?.(tab)}
      >
        {content}
      </a>
    ) : (
      <button
        type="button"
        className="select-none"
        aria-label={label}
        onClick={() => onSelect?.(tab)}
      >
        {content}
      </button>
    );
  };

  return (
    <nav
      aria-label="Primary"
      className={clsx(
        "fixed inset-x-0 bottom-0 z-50 bg-white border-t border-black",
        // Safe-area padding for iOS home indicator
        "pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      <div className="mx-auto max-w-[480px]">
        <ul className="flex items-center justify-between">
          {/* Home */}
          <li>
            <Item tab="home" label="Home">
              <House className={clsx("h-7 w-7", color("home"))} />
            </Item>
          </li>

          {/* Analytics */}
          <li>
            <Item tab="analytics" label="Analytics">
              <ChartNoAxesColumn className={clsx("h-7 w-7", color("analytics"))} />
            </Item>
          </li>

          {/* Cart */}
          <li>
            <Item tab="cart" label="Cart">
              {useNotifCartIcon ? (
                <img
                  src={active === "cart" ? cartActiveUrl : cartUrl}
                  alt=""
                  className="h-7 w-7"
                  draggable={false}
                />
              ) : (
                <ShoppingBasket className={clsx("h-7 w-7", color("cart"))} />
              )}
            </Item>
          </li>
        </ul>
      </div>
    </nav>
  );
}
