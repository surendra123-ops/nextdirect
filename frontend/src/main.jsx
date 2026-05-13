import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function Root() {
  const app = (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          toastOptions={{
            className: "bg-white text-neutral-900 border border-neutral-200 shadow-lg",
            duration: 4000,
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );

  if (!googleClientId) {
    return app;
  }

  return <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
