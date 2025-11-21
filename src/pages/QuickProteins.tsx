import { useEffect, useRef, useState } from "react";
import { QuickAddItem } from "../components/QuickAddItem";
import { useNavBar } from "../context/NavBarContext";
import BackButton from "../components/BackButton";
import {
  useGroceries,
  useQuickProteinSelections,
  useSuppressedGroceries,
} from "../utils/localStorageHooks";
import type { Grocery } from "../types/localStorage";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
const norm = (s: string) => s.trim().toLowerCase();

const ITEMS = [
  { name: "protein bar", imageSrc: "/Images/bar.png" },
  { name: "chicken breast", imageSrc: "/Images/chickenBreast.png" },
  { name: "protein shake", imageSrc: "/Images/shake.png" },
] as const;

export default function QuickProteins() {
  const { setUseNotifCartIcon } = useNavBar();
  const [groceries, setGroceries] = useGroceries();
  const [selectedMap, setSelectedMap] = useQuickProteinSelections();
  const [suppressed, setSuppressed] = useSuppressedGroceries();

  const [toast, setToast] = useState<{
    label: string;
    action: "added" | "removed";
    visible: boolean;
  }>({
    label: "",
    action: "added",
    visible: false,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- initialize selection from groceries on mount ---
  useEffect(() => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      for (const { name } of ITEMS) {
        if (next[name] === undefined) {
          next[name] = groceries.some((g) => norm(g.label) === norm(name));
        }
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- keep selections synced if groceries change externally ---
  useEffect(() => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      for (const { name } of ITEMS) {
        const inGroceries = groceries.some(
          (g) => norm(g.label) === norm(name)
        );
        // if item no longer in groceries, deselect it
        if (!inGroceries && next[name]) {
          next[name] = false;
        }
        // if item was added manually elsewhere, select it
        if (inGroceries && !next[name]) {
          next[name] = true;
        }
      }
      return next;
    });
  }, [groceries]);

  // --- helpers ---
  const showToast = (label: string, action: "added" | "removed") => {
    setToast({ label, action, visible: true });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setToast({ label: "", action, visible: false }),
      2000
    );
  };

  const addGrocery = (label: string) => {
    const n = norm(label);
    setSuppressed((prev) => prev.filter((x) => x !== n));

    setGroceries((prev: Grocery[]) => {
      const exists = prev.some((g) => norm(g.label) === n);
      if (exists) return prev;
      const next = [{ id: makeId(), label, checked: false }, ...prev];
      setUseNotifCartIcon(next.length > 0);
      return next;
    });

    showToast(label, "added");
  };

  const removeGroceryByLabel = (label: string) => {
    const n = norm(label);
    setGroceries((prev) => {
      const next = prev.filter((g) => norm(g.label) !== n);
      setUseNotifCartIcon(next.length > 0);
      return next;
    });
    setSuppressed((prev) => (prev.includes(n) ? prev : [n, ...prev]));
    showToast(label, "removed");
  };

  const handleSelectedChange = (name: string, nextSelected: boolean) => {
    setSelectedMap((prev) => ({ ...prev, [name]: nextSelected }));

    if (nextSelected) {
      addGrocery(name);
    } else {
      removeGroceryByLabel(name);
    }
  };

  // --- UI ---
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
            selected={!!selectedMap[name]}
            onSelectedChange={(next) => handleSelectedChange(name, next)}
          />
        ))}
      </section>

      {toast.visible && (
        <div className="fixed top-6 right-6 z-50 rounded-xl border-2 border-green-primary bg-white px-4 py-2 shadow-lg">
          <span className="text-sm text-black">
            <strong>{toast.label}</strong> {toast.action}{" "}
            {toast.action === "added" ? "to" : "from"} grocery list
          </span>
        </div>
      )}
    </div>
  );
}
