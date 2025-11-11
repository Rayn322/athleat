// src/components/NavBar.tsx
import clsx from "clsx";
import { House, ChartNoAxesColumn, ShoppingBasket } from "lucide-react";
import cartUrl from "../assets/icons/shopping-basket-notif.svg?url";
import cartActiveUrl from "../assets/icons/shopping-basket-notif-active.svg?url";
import type { PropsWithChildren } from "react";

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
    t === active ? "text--green-primary" : "text-black";

  return (
    <nav
      aria-label="Primary"
      className={clsx(
        "fixed inset-x-0 bottom-0 z-50 border-t border-black bg-white",
        // Safe-area padding for iOS home indicator
        "pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      <div className="mx-auto max-w-[480px]">
        <ul className="flex items-center justify-between">
          {/* Home */}
          <li>
            <Item
              tab="home"
              label="Home"
              hrefs={hrefs}
              active={active}
              onSelect={onSelect}
            >
              <House className={clsx("h-7 w-7", color("home"))} />
            </Item>
          </li>

          {/* Analytics */}
          <li>
            <Item
              tab="analytics"
              label="Analytics"
              hrefs={hrefs}
              active={active}
              onSelect={onSelect}
            >
              <ChartNoAxesColumn
                className={clsx("h-7 w-7", color("analytics"))}
              />
            </Item>
          </li>

          {/* Cart */}
          <li>
            <Item
              tab="cart"
              label="Cart"
              hrefs={hrefs}
              active={active}
              onSelect={onSelect}
            >
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

type ItemProps = PropsWithChildren<{
  tab: Tab;
  label: string;
  hrefs?: Partial<Record<Tab, string>>;
  active: Tab;
  onSelect?: (tab: Tab) => void;
  children: React.ReactNode;
}>;

function Item({ tab, label, children, hrefs, active, onSelect }: ItemProps) {
  const href = hrefs?.[tab];
  const content = (
    <span
      className="grid h-16 place-items-center rounded-lg px-2 outline-none focus-visible:ring-2 focus-visible:ring-green-primary/40"
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
}
