import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import { SITE_NAME, SITE_TAGLINE } from "../../constants/site.js";

export function LandingFooter() {
  return (
    <footer className="bg-neutral-900 py-10 text-neutral-400">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">{SITE_NAME}</p>
          <p className="mt-1 text-sm">{SITE_TAGLINE}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to={ROUTES.home} className="hover:text-white">
            Privacy
          </Link>
          <Link to={ROUTES.home} className="hover:text-white">
            Terms
          </Link>
          <Link to={ROUTES.login} className="hover:text-white">
            Log in
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl px-4 text-center text-xs text-neutral-500 sm:text-left">
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
    </footer>
  );
}
