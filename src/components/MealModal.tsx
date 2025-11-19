import { Edit, X } from "lucide-react";
import { Button } from "./Button";
import { Tag } from "./Tag";

type Tag = {
  label: string;
  emphasized?: boolean;
};

export type MealModalProps = {
  name: string;
  calories: number;
  tags: Tag[];
  completed: boolean;
  onMarkCompleted: () => void;
  onMarkIncomplete: () => void;
  onClose: () => void;
  onEdit?: () => void;
};

export default function MealModal({
  name,
  calories,
  tags,
  completed,
  onMarkCompleted,
  onMarkIncomplete,
  onClose,
  onEdit,
}: MealModalProps) {
  return (
    <div className="flex grow flex-col gap-8 rounded-[20px] bg-white p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <button className="cursor-pointer">
            <X onClick={onClose} />
          </button>
          <button className="cursor-pointer">
            <Edit onClick={onEdit} />
          </button>
        </div>
        <div className="border-b-2 border-light-gray pb-8">
          <h2 className="text-h2 font-semibold">{name}</h2>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium">{calories} calories</p>
          <div className="flex gap-[3px] font-medium">
            {tags.map((tag) => (
              <Tag
                key={tag.label}
                label={tag.label}
                size="sm" // all sizes are too big, supposed to be size "default"
                variant={tag.emphasized ? "outline-green" : "outline-black"}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          if (completed) onMarkIncomplete();
          else onMarkCompleted();
          onClose();
        }}
      >
        {completed ? "mark incomplete" : "mark completed"}
      </Button>
    </div>
  );
}
