import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { LandingPage } from "../pages/LandingPage.jsx";
import { Spinner } from "../components/ui/Spinner.jsx";
import { ROUTES } from "../constants/routes.js";

export function HomeGate() {
  const { user, booting } = useAuth();

  if (booting) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] flex-1 items-center justify-center bg-neutral-50 px-4 py-20">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <LandingPage />;
}
