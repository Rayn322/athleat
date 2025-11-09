import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function Root() {
  return (
    <div>
      <p>This is the main page</p>
      <Link
        to="/other"
        className="flex w-fit gap-2 rounded-3xl bg-green-primary px-4 py-3 text-white"
      >
        <span>Go to other page</span>
        <ChevronRight />
      </Link>
    </div>
  );
}
