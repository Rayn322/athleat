import * as React from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

export type CheckboxProps = {
  /** Optional initial checked state (default = true) */
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export function Checkbox({ 
  defaultChecked = true,
  checked: controlledChecked,
  onCheckedChange,
  className,
}: CheckboxProps) {
  const isControlled = controlledChecked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);

  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleClick = () => {
    const next = !checked;
    if (!isControlled) setUncontrolledChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      aria-checked={checked}
      role="checkbox"
      onClick={handleClick}
      className={clsx(
        "flex items-center justify-center",
        "h-6 w-6 shrink-0 rounded-sm transition-all duration-150",
        checked
          ? "bg-green-primary hover:bg-green-primary/90"
          : "border-2 border-black hover:bg-black/5",
        className,
      )}
    >
      {checked && <Check className="h-4 w-4 text-white" strokeWidth={2} />}
    </button>
  );
}
