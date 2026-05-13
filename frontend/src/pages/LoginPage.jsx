import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { ROUTES } from "../constants/routes.js";
import { errorMessage } from "../utils/errors.js";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function LoginPage() {
  const { login, loginWithGoogle, user, booting } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "" } });

  useEffect(() => {
    if (!booting && user) {
      navigate(ROUTES.home, { replace: true });
    }
  }, [booting, user, navigate]);

  async function onSubmit(values) {
    try {
      await login(values);
      toast.success("Welcome back");
      navigate(ROUTES.home, { replace: true });
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  async function onGoogleSuccess(credentialResponse) {
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success("Welcome back");
      navigate(ROUTES.home, { replace: true });
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-md items-center px-4 py-16">
      <Card className="w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Sign in</h1>
          <p className="mt-1 text-sm text-neutral-600">Email and password, or sign in with Google.</p>
        </div>

        {googleClientId ? (
          <div className="flex w-full max-w-none justify-center [&>div]:w-full">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              useOneTap={false}
              theme="filled_blue"
              shape="rectangular"
              size="large"
              text="continue_with"
            />
          </div>
        ) : (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
            Add <code className="font-mono">VITE_GOOGLE_CLIENT_ID</code> to enable Google sign-in.
          </p>
        )}

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium text-neutral-500">or with email</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-600">
          No account?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to={ROUTES.register}>
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
