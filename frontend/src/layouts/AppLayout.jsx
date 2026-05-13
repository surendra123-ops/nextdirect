import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar.jsx";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <Navbar />
      <Outlet />
    </div>
  );
}
