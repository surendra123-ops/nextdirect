import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { ROUTES } from "../../constants/routes.js";

export function CtaSection() {
  return (
    <section className="border-b border-neutral-200 bg-emerald-700 py-12 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-lg font-semibold">Have a place to list?</h2>
          <p className="mt-1 text-sm text-emerald-100">Create an account and go from there.</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-2 sm:justify-end">
          <Link to={ROUTES.register}>
            <Button className="bg-white text-emerald-800 hover:bg-emerald-50">Register</Button>
          </Link>
          <Link to={ROUTES.login}>
            <Button variant="ghost" className="border border-white/40 text-white hover:bg-white/10">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
