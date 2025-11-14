import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="space-y-2 p-4">
      {/* <h1 className="text-2xl font-semibold">hello</h1> */}
      <Outlet />
    </div>
  );
}
