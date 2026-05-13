import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../ui/Button.jsx";
import { Skeleton } from "../ui/Skeleton.jsx";
import { ROUTES } from "../../constants/routes.js";
import { SITE_NAME } from "../../constants/site.js";

function navLinkClass({ isActive }) {
  return `text-sm font-semibold transition ${
    isActive ? "text-emerald-800" : "text-neutral-600 hover:text-neutral-900"
  }`;
}

function initials(name, email) {
  const base = (name || email || "?").trim();
  const parts = base.split(/[\s@._-]+/).filter(Boolean);
  const a = parts[0]?.[0] || "?";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase();
}

export function Navbar() {
  const { user, booting, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function onLogout() {
    setMenuOpen(false);
    await logout();
    navigate(ROUTES.home);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <Link to={ROUTES.home} className="shrink-0 text-lg font-bold tracking-tight text-emerald-900">
            {SITE_NAME}
          </Link>
        </div>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          {booting ? (
            <Skeleton className="h-10 w-44 rounded-full" />
          ) : isAuthenticated ? (
            <>
              <Link
                to={ROUTES.profile}
                className="flex max-w-[220px] items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 py-1 pl-1 pr-3 transition hover:border-emerald-300 hover:bg-emerald-50/60"
                aria-label="View profile"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                    {initials(user?.username, user?.email)}
                  </span>
                )}
                <span className="truncate text-xs font-semibold text-neutral-800">{user?.username}</span>
              </Link>
              <Button type="button" variant="ghost" className="px-3 py-2 text-sm" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to={ROUTES.login} className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to={ROUTES.register} className={navLinkClass}>
                Register
              </NavLink>
              <Link to={ROUTES.register}>
                <Button className="px-4 py-2 text-sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white p-2 text-neutral-800 shadow-sm md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neutral-800">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col items-end gap-3 text-right">
            {booting ? (
              <Skeleton className="h-10 w-full max-w-xs rounded-lg" />
            ) : isAuthenticated ? (
              <div className="flex w-full max-w-xs flex-col items-end gap-3">
                <Link
                  to={ROUTES.profile}
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-end gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 transition hover:border-emerald-300 hover:bg-emerald-50/60"
                  aria-label="View profile"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                      {initials(user?.username, user?.email)}
                    </span>
                  )}
                  <div className="min-w-0 flex-1 text-right">
                    <p className="truncate text-sm font-semibold text-neutral-900">{user?.username}</p>
                    <p className="truncate text-xs text-neutral-500">{user?.email}</p>
                  </div>
                </Link>
                <Button type="button" variant="ghost" className="px-3 py-2 text-sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex w-full max-w-xs flex-col items-end gap-3">
                <NavLink to={ROUTES.login} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to={ROUTES.register} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Register
                </NavLink>
                <Link to={ROUTES.register} onClick={() => setMenuOpen(false)} className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
