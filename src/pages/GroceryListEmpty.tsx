import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { GroceryItem } from "../components/GroceryItem";
import { useMeals, useGroceries, useSuppressedGroceries } from "../utils/localStorageHooks";
import type { DayOfMeals, Meal, Grocery } from "../types/localStorage";
import { useNavBar } from "../context/NavBarContext";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
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
  const [suppressed, setSuppressed] = useSuppressedGroceries(); // 👈 NEW

  const [toast, setToast] = useState<{ item: Grocery | null; visible: boolean }>({
    item: null,
    visible: false,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived list of meal ingredient labels (original casing)
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

  // Seed groceries from meals (newest-first), but SKIP suppressed labels
  useEffect(() => {
    if (!meals) return;

    const mealNormToOriginal = new Map<string, string>();
    const mealLabelSet = new Set<string>();
    derivedFromMeals.forEach((label) => {
      const n = norm(label);
      if (!mealLabelSet.has(n)) {
        mealLabelSet.add(n);
        if (!mealNormToOriginal.has(n)) mealNormToOriginal.set(n, label);
      }
    });

    const groceryLabelSet = new Set(groceries.map((g) => norm(g.label)));
    const suppressedSet = new Set(suppressed.map(norm)); // normalized

    const toAdd: Grocery[] = [];
    mealLabelSet.forEach((nLabel) => {
      if (suppressedSet.has(nLabel)) return; // 👈 skip user-deleted labels
      if (!groceryLabelSet.has(nLabel)) {
        const original = mealNormToOriginal.get(nLabel) ?? nLabel;
        toAdd.push({ id: makeId(), label: original, checked: false });
      }
    });

    if (toAdd.length > 0) setGroceries((prev) => [...toAdd, ...prev]);
  }, [meals, derivedFromMeals, groceries, suppressed, setGroceries]);

  const handleToggle = (id: string, isChecked: boolean) => {
    setGroceries((prev) => prev.map((it) => (it.id === id ? { ...it, checked: isChecked } : it)));
  };

  const handleRemove = (id: string) => {
    const itemToRemove = groceries.find((it) => it.id === id);
    if (!itemToRemove) return;

    // Remove from groceries
    setGroceries((prev) => prev.filter((it) => it.id !== id));

    // Add to suppression list so seeding won’t re-add it
    const n = norm(itemToRemove.label);
    setSuppressed((prev) => (prev.includes(n) ? prev : [n, ...prev])); // newest-first optional

    // Show toast
    setToast({ item: itemToRemove, visible: true });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast({ item: null, visible: false }), 5000);
  };

  const handleUndo = () => {
    if (!toast.item) return;

    // Restore item to top
    setGroceries((prev) => [toast.item!, ...prev]);

    // Remove its label from suppression so seeding can add it again in future if needed
    const n = norm(toast.item.label);
    setSuppressed((prev) => prev.filter((x) => x !== n));

    setToast({ item: null, visible: false });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const hasGroceries = groceries.length > 0;

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
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Toast (top-right) */}
      {toast.visible && toast.item && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-4 rounded-xl bg-white px-5 py-3 shadow-lg animate-in fade-in slide-in-from-top-2 border-green-primary border-2">
          <span className="text-sm text-black">
            Removed <strong>{toast.item.label}</strong>
          </span>
          <button onClick={handleUndo} className="font-semibold text-green-primary hover:underline">
            Undo
          </button>
        </div>
      )}
    </section>
  );
}
