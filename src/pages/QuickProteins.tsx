import { useEffect, useRef, useState } from "react";
import { QuickAddItem } from "../components/QuickAddItem";
import { useNavBar } from "../context/NavBarContext";
import BackButton from "../components/BackButton";
import { useGroceries, useQuickProteinSelections } from "../utils/localStorageHooks";
import type { Grocery } from "../types/localStorage";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const ITEMS = [
  { name: "protein bar", imageSrc: "/Images/bar.png" },
  { name: "chicken breast", imageSrc: "/Images/chickenBreast.png" },
  { name: "protein shake", imageSrc: "/Images/shake.png" },
] as const;

export default function QuickProteins() {
  const { setUseNotifCartIcon } = useNavBar();
  const [groceries, setGroceries] = useGroceries();
  const [selectedMap, setSelectedMap] = useQuickProteinSelections();

  // tiny toast (optional)
  const [toast, setToast] = useState<{ label: string; visible: boolean }>({ label: "", visible: false });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // initialize selection from groceries (run once)
  useEffect(() => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      for (const { name } of ITEMS) {
        if (next[name] === undefined) {
          next[name] = groceries.some((g) => g.label.trim().toLowerCase() === name);
        }
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addGrocery = (label: string) => {
    setGroceries((prev: Grocery[]) => {
      const exists = prev.some((g) => g.label.trim().toLowerCase() === label.trim().toLowerCase());
      if (exists) return prev;
      const next = [{ id: makeId(), label, checked: false }, ...prev]; // newest first
      // optional: toggle notif based on whether we have any items
      setUseNotifCartIcon(next.length > 0);
      return next;
    });

    // toast
    setToast({ label, visible: true });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast({ label: "", visible: false }), 2000);
  };

  const removeGroceryByLabel = (label: string) => {
    setGroceries((prev) => {
      const next = prev.filter((g) => g.label.trim().toLowerCase() !== label.trim().toLowerCase());
      setUseNotifCartIcon(next.length > 0); // optional
      return next;
    });
  };

  const handleSelectedChange = (name: string, nextSelected: boolean) => {
    // persist selection
    setSelectedMap((prev) => ({ ...prev, [name]: nextSelected }));

    if (nextSelected) {
      addGrocery(name);
    } else {
      // remove from grocery list when unselected
      removeGroceryByLabel(name);
    }
  };

  return (
    <div className="mt-4 space-y-13 relative">
      <BackButton />
      <div className="space-y-1">
        <h1 className="text-h1">quick proteins</h1>
        <p className="text-sm">Add proteins to your next grocery trip.</p>
      </div>

      <section className="space-y-4">
        {ITEMS.map(({ name, imageSrc }) => (
          <QuickAddItem
            key={name}
            name={name}
            imageSrc={imageSrc}
            selected={!!selectedMap[name]}                      // controlled
            onSelectedChange={(next) => handleSelectedChange(name, next)}
          />
        ))}
      </section>

      {toast.visible && (
        <div className="fixed top-6 right-6 z-50 rounded-xl border-2 border-green-primary bg-white px-4 py-2 shadow-lg">
          <span className="text-sm text-black">
            <strong>{toast.label}</strong> added to grocery list
          </span>
        </div>
      )}
    </div>
  );
}
