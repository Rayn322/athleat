import { Link } from "react-router";

export default function Other() {
  return (
    <div>
      <p>This is another page</p>
      <Link to="/" className="text-blue-500 underline">
        Back to main page
      </Link>
    </div>
  );
}
