import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { GroceryItem } from "../components/GroceryItem";
import { useMeals, useGroceries } from "../utils/localStorageHooks";
import type { DayOfMeals, Meal, Grocery } from "../types/localStorage";
import { useNavBar } from "../context/NavBarContext";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function norm(s: string) {
  return s.trim().toLowerCase();
}

export default function GroceryListEmpty() {
  const navigate = useNavigate();
  const { setUseNotifCartIcon } = useNavBar();

  const [meals] = useMeals();
  const [groceries, setGroceries] = useGroceries();

  const [toast, setToast] = useState<{ item: Grocery | null; visible: boolean }>({
    item: null,
    visible: false,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived (not used directly to render, just for initial seeding comparison helpers)
  const derivedFromMeals = useMemo(() => {
    const items: string[] = [];
    meals?.forEach((day: DayOfMeals) => {
      (["breakfast", "lunch", "dinner"] as const).forEach((slot) => {
        const meal: Meal | null = day?.[slot] ?? null;
        meal?.groceries?.forEach((label) => items.push(label));
      });
    });
    return items;
  }, [meals]);

  // Seed groceries from meals or add *new* ones (newest at top).
  // Preserve existing items (and their checked state).
  useEffect(() => {
    if (!meals) return;

    // Unique normalized labels from meals
    const mealLabelSet = new Set<string>();
    // Map normalized -> original label we’ll store (first seen keeps its original casing)
    const mealNormToOriginal = new Map<string, string>();

    derivedFromMeals.forEach((label) => {
      const n = norm(label);
      if (!mealLabelSet.has(n)) {
        mealLabelSet.add(n);
        mealNormToOriginal.set(n, label);
      }
    });

    // Existing groceries normalized
    const groceryLabelSet = new Set(groceries.map((g) => norm(g.label)));

    // Only add new ones that aren't already present (by normalized label)
    const toAdd: Grocery[] = [];
    mealLabelSet.forEach((nLabel) => {
      if (!groceryLabelSet.has(nLabel)) {
        const original = mealNormToOriginal.get(nLabel) ?? nLabel;
        toAdd.push({ id: makeId(), label: original, checked: false });
      }
    });

    // Prepend so newest appear first
    if (toAdd.length > 0) {
      setGroceries((prev) => [...toAdd, ...prev]);
    }
  }, [meals, derivedFromMeals, groceries, setGroceries]);

  const handleToggle = (id: string, isChecked: boolean) => {
    // Persist checked state
    setGroceries((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: isChecked } : it)),
    );
  };

  const handleRemove = (id: string) => {
    const itemToRemove = groceries.find((it) => it.id === id);
    if (!itemToRemove) return;

    // Remove item
    setGroceries((prev) => prev.filter((it) => it.id !== id));

    // Show toast
    setToast({ item: itemToRemove, visible: true });

    // Auto-dismiss after 5s
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast({ item: null, visible: false }), 5000);
  };

  const handleUndo = () => {
    if (!toast.item) return;

    // Put the undone item back at the top
    setGroceries((prev) => [toast.item!, ...prev]);
    setToast({ item: null, visible: false });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const hasGroceries = groceries.length > 0;

  // Hide the grocery notif icon when entering this page
  useEffect(() => {
    setUseNotifCartIcon(false);
  }, [setUseNotifCartIcon]);

  return (
    <section className="relative flex min-h-screen flex-col">
      <div className="px-0">
        <p className="text-h1">your grocery list</p>
      </div>

      {hasGroceries ? (
        <div className="mt-6 flex-1">
          <div className="flex flex-col gap-2">
            {/* Newest are stored first; no reverse() needed */}
            {groceries.map((item) => (
              <GroceryItem
                key={item.id}
                label={item.label}
                checked={item.checked}
                onChange={(checked) => handleToggle(item.id, checked)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate("/Groceries1")}
              className="inline-flex items-center gap-2 rounded-full bg-green-primary px-5 py-3 font-semibold text-white shadow-lg"
              aria-label="Plan next week"
            >
              <span>plan next week</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-black/60">no groceries yet...</p>
          <button
            onClick={() => navigate("/Groceries1")}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-primary px-5 py-3 font-semibold text-white shadow-lg"
            aria-label="Plan next week"
          >
            <span>plan next week</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* ✅ Toast (top-right) */}
      {toast.visible && toast.item && (
        <div
          className="
            fixed top-6 right-6 z-50
            flex items-center gap-4
            rounded-xl bg-white
            px-5 py-3 shadow-lg
            animate-in fade-in slide-in-from-top-2
            border-green-primary border-2
          "
        >
          <span className="text-sm text-black">
            Removed <strong>{toast.item.label}</strong>
          </span>
          <button
            onClick={handleUndo}
            className="font-semibold text-green-primary hover:underline"
          >
            Undo
          </button>
        </div>
      )}
    </section>
  );
}
