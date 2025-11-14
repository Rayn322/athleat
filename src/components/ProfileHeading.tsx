import * as React from "react";
import clsx from "clsx";

export type ProfileHeadingProps = {
  /** Lucide icon component: pass like: icon={<User />} */
  icon: React.ReactNode;
  text: string;
  className?: string;
};

export function ProfileHeading({ icon, text, className }: ProfileHeadingProps) {
  return (
    <div
      className={clsx(
        "flex w-full max-w-[345px] items-start justify-between pb-3",
        "border-b-2 border-light-gray",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-6 w-6">{icon}</div>

        <span className="font-regular text-h3 text-black">{text}</span>
      </div>
    </div>
  );
}
