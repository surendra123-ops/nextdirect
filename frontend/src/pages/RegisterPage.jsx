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

export function RegisterPage() {
  const { register: registerUser, loginWithGoogle, user, booting } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { username: "", email: "", password: "" },
  });

  useEffect(() => {
    if (!booting && user) {
      navigate(ROUTES.home, { replace: true });
    }
  }, [booting, user, navigate]);

  async function onSubmit(values) {
    try {
      await registerUser(values);
      toast.success("Account created");
      navigate(ROUTES.home, { replace: true });
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  async function onGoogleSuccess(credentialResponse) {
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success("Signed in with Google");
      navigate(ROUTES.home, { replace: true });
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-md items-center px-4 py-16">
      <Card className="w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Create account</h1>
          <p className="mt-1 text-sm text-neutral-600">Choose email/password or Google.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Username"
            autoComplete="username"
            error={errors.username?.message}
            {...register("username", {
              required: "Username is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
          />
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
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating…" : "Create account"}
          </Button>
        </form>

        {googleClientId ? (
          <div className="flex justify-center border-t border-neutral-100 pt-6">
            <GoogleLogin onSuccess={onGoogleSuccess} useOneTap={false} theme="outline" shape="pill" size="large" />
          </div>
        ) : null}

        <p className="text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to={ROUTES.login}>
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
