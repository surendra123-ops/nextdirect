import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import * as userService from "../services/userService.js";
import { Card } from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Textarea } from "../components/ui/Textarea.jsx";
import { Button } from "../components/ui/Button.jsx";
import { ROUTES } from "../constants/routes.js";
import { errorMessage } from "../utils/errors.js";

export function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { username: "", avatar: "", bio: "" },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        avatar: user.avatar || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  async function onSubmit(values) {
    try {
      const next = {
        username: values.username.trim(),
        avatar: values.avatar.trim(),
        bio: values.bio,
      };
      const updated = await userService.updateMe(next);
      updateUser(updated);
      toast.success("Profile saved");
      navigate(ROUTES.profile);
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mx-auto max-w-xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Edit profile</h1>
          <p className="mt-1 text-neutral-600">Update how you appear in the app.</p>
        </div>

        <Card>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label="Username"
              error={errors.username?.message}
              {...register("username", {
                required: "Username is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
            />
            <Input
              label="Avatar URL"
              type="text"
              placeholder="https://"
              error={errors.avatar?.message}
              {...register("avatar")}
            />
            <Textarea label="Bio" error={errors.bio?.message} {...register("bio")} />
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : "Save changes"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate(ROUTES.profile)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
