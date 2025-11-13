import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type DropdownProps = {
  className?: string;
};

export function Dropdown({ className }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "inline-flex items-center justify-center",
        "gap-2.5 rounded-xl bg-light-gray",
        "p-2 transition-all duration-150 hover:opacity-90 active:opacity-80",
        className
      )}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5 text-black" strokeWidth={2} />
      </motion.div>
    </button>
  );
}
