import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { ROUTES } from "../constants/routes.js";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Profile</h1>
            <p className="mt-1 text-neutral-600">Signed in as {user?.email}</p>
          </div>
          <Link to={ROUTES.profileEdit}>
            <Button variant="outline">Edit profile</Button>
          </Link>
        </div>

        <Card className="grid gap-6 sm:grid-cols-[140px_1fr]">
          <div className="flex justify-center sm:justify-start">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="h-28 w-28 rounded-2xl border border-neutral-200 object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-sm font-semibold text-neutral-500">
                No photo
              </div>
            )}
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-neutral-500">Username</dt>
              <dd className="text-base font-semibold text-neutral-900">{user?.username}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Email</dt>
              <dd className="text-base font-semibold text-neutral-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Sign-in</dt>
              <dd className="text-base font-semibold capitalize text-neutral-900">{user?.authProvider}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Bio</dt>
              <dd className="whitespace-pre-wrap text-base text-neutral-800">{user?.bio || "—"}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
