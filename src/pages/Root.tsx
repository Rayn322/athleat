import { Link } from "react-router";

export default function Root() {
  return (
    <div>
      <p>This is the main page</p>
      <Link to="/other" className="text-blue-500 underline">
        Go to another page
      </Link>
    </div>
  );
}
