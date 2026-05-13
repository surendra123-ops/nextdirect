import { env } from "../config/env.js";
import { COOKIE_NAMES } from "../constants/cookies.js";
import { parseExpiresInToMs } from "./parseExpiresIn.js";

function baseCookieOptions() {
  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: env.isProd ? "none" : "lax",
    path: "/",
    ...(env.cookieDomain ? { domain: env.cookieDomain } : {}),
  };
}

export function attachAuthCookies(res, { accessToken, refreshToken }) {
  const accessMs = parseExpiresInToMs(env.jwtAccessExpires);
  const refreshMs = parseExpiresInToMs(env.jwtRefreshExpires);

  res.cookie(COOKIE_NAMES.access, accessToken, {
    ...baseCookieOptions(),
    maxAge: accessMs,
  });

  res.cookie(COOKIE_NAMES.refresh, refreshToken, {
    ...baseCookieOptions(),
    maxAge: refreshMs,
  });
}

export function clearAuthCookies(res) {
  const opts = { ...baseCookieOptions(), maxAge: 0 };
  res.clearCookie(COOKIE_NAMES.access, opts);
  res.clearCookie(COOKIE_NAMES.refresh, opts);
}

export function readAccessToken(req) {
  const fromCookie = req.cookies?.[COOKIE_NAMES.access];
  if (fromCookie) return fromCookie;
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);
  return null;
}

export function readRefreshToken(req) {
  return req.cookies?.[COOKIE_NAMES.refresh] || null;
}
