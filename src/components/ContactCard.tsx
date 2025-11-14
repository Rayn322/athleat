import * as React from "react";
import { Plus, X } from "lucide-react";
import clsx from "clsx";

export type ContactData = {
  id?: number;
  name?: string;
  company?: string;
};

export type ContactCardProps = {
  /** if name/company omitted -> renders the "add" card */
  name?: string;
  company?: string;
  className?: string;
  onSave?: (data: { name: string; company: string }) => void;
  onRemove?: () => void;
};

export function ContactCard({
  name: propName,
  company: propCompany,
  className,
  onSave,
  onRemove,
}: ContactCardProps) {
  const isEmptyInitial = !propName && !propCompany;
  const [isEditing, setIsEditing] = React.useState<boolean>(isEmptyInitial);
  const [name, setName] = React.useState<string>(propName ?? "");
  const [company, setCompany] = React.useState<string>(propCompany ?? "");

  // keep inputs in sync if parent changes props
  React.useEffect(() => {
    setName(propName ?? "");
    setCompany(propCompany ?? "");
  }, [propName, propCompany]);

  const handleSave = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    if (!name.trim()) {
      // require a name to save; simple guard
      return;
    }
    onSave?.({ name: name.trim(), company: company.trim() });
    setIsEditing(false);
  };

  const handleCancel = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    // if it was an "add" card (no props) and user cancels -> close edit to show plus again
    if (isEmptyInitial && !propName && !propCompany) {
      setName("");
      setCompany("");
      setIsEditing(false);
      return;
    }
    // otherwise revert changes
    setName(propName ?? "");
    setCompany(propCompany ?? "");
    setIsEditing(false);
  };

  // Render root as a non-button container to avoid nested interactive problems.
  return (
    <div
      className={clsx(
        "relative shrink-0",
        isEmptyInitial && !isEditing
          ? "w-[50px] h-[50px]"
          : "w-auto min-h-[70px] p-2",
        "rounded-xl border-2 border-light-gray bg-white",
        "flex flex-col items-start justify-center transition-all",
        className
      )}
    >
      {/* Remove icon (top-right) for filled cards */}
      {!isEmptyInitial && !isEditing && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove contact"
          className="absolute right-2 top-2 p-1"
        >
          <X className="h-3 w-3 text-black" strokeWidth={2} />
        </button>
      )}

      {/* Empty + state (not editing) */}
      {isEmptyInitial && !isEditing && (
        <div
          onClick={() => setIsEditing(true)}
          className="flex h-full w-full cursor-pointer select-none items-center justify-center"
        >
          <Plus className="h-6 w-6 text-black" strokeWidth={2} />
        </div>
      )}

      {/* Edit mode (for both add and edit) */}
      {isEditing && (
        <div className="w-full flex flex-col gap-1">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full bg-transparent text-small font-medium text-black placeholder:text-gray-400 focus:outline-none"
          />
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            className="w-full bg-transparent text-small italic text-dark-gray placeholder:text-gray-400 focus:outline-none"
          />

          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-green-primary px-3 py-1 text-xs font-medium text-white"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg bg-white border px-3 py-1 text-xs font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filled display (not editing) */}
      {!isEmptyInitial && !isEditing && (
        <div
          onClick={() => setIsEditing(true)}
          className="w-full cursor-pointer flex flex-col gap-1"
        >
          <div
            className="text-small font-medium text-black overflow-hidden whitespace-nowrap overflow-ellipsis"
            style={{ maxWidth: 66 }}
          >
            {propName}
          </div>
          <div className="text-small italic text-dark-gray overflow-hidden whitespace-nowrap overflow-ellipsis">
            {propCompany}
          </div>
        </div>
      )}
    </div>
  );
}
