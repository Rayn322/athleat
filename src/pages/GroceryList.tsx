import { useNavigate } from "react-router";

export default function GroceryList() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col">
      {/* Header (left-aligned like Groceries1) */}
      <div className="px-0">
        <p className="text-2xl font-bold">your grocery list</p>
      </div>


      {/* Centered empty state */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {/* Outline milk carton + apple icon */}
        <svg
          width="112"
          height="112"
          viewBox="0 0 96 96"
          fill="none"
          aria-hidden="true"
          className="text-black"
        >
          <path
            d="M26 28l10-8h18l6 8v40a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6V28z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M36 20v8h24"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="68" cy="62" r="12" stroke="currentColor" strokeWidth="4" />
          <path
            d="M68 50c2-4 5-6 9-6"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M64 50c-2-4-5-6-9-6"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M66 44c0-3 2-6 6-7"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        <p className="text-black/60">no groceries yet...</p>

        {/* Pill button */}
        <button
          onClick={() => navigate("/Groceries1")}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-primary text-white px-5 py-3 font-semibold shadow-lg"
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
    </section>
  );
}
