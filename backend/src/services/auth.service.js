import { OAuth2Client } from "google-auth-library";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { AuthProvider } from "../constants/auth.js";
import { COOKIE_NAMES } from "../constants/cookies.js";
import { env } from "../config/env.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { hashRefreshToken, compareRefreshToken } from "../utils/refreshTokenHash.js";
import { attachAuthCookies, clearAuthCookies } from "../utils/cookieAuth.js";

const googleClient = new OAuth2Client(env.googleClientId);

export async function registerUser({ username, email, password }, res) {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new ApiError(HttpStatus.CONFLICT, "Email already registered");
  }

  const user = await User.create({
    username,
    email,
    password,
    authProvider: AuthProvider.LOCAL,
  });

  await issueSession(user, res);
  return user.toSafeJSON();
}

export async function loginUser({ email, password }, res) {
  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  if (user.authProvider === AuthProvider.GOOGLE) {
    throw new ApiError(HttpStatus.BAD_REQUEST, "Use Google sign-in for this account");
  }

  const ok = await user.comparePassword(password);
  if (!ok) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  await issueSession(user, res);
  return user.toSafeJSON();
}

export async function googleAuth({ idToken }, res) {
  if (!env.googleClientId) {
    throw new ApiError(HttpStatus.SERVICE_UNAVAILABLE, "Google sign-in is not configured");
  }

  let ticket;
  try {
    ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.googleClientId,
    });
  } catch {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Google sign-in failed");
  }

  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid Google token");
  }

  const email = payload.email.toLowerCase();
  let user = await User.findOne({ googleId: payload.sub });

  if (!user) {
    const byEmail = await User.findOne({ email });
    if (byEmail) {
      if (byEmail.googleId && byEmail.googleId !== payload.sub) {
        throw new ApiError(
          HttpStatus.CONFLICT,
          "This email is already linked to a different Google account."
        );
      }
      user = byEmail;
      user.googleId = payload.sub;
      if (payload.picture && !(user.avatar || "").trim()) {
        user.avatar = payload.picture;
      }
      await user.save();
    } else {
      const username = await uniqueUsernameFromEmail(email, payload.name);
      user = await User.create({
        username,
        email,
        authProvider: AuthProvider.GOOGLE,
        googleId: payload.sub,
        avatar: payload.picture || "",
      });
    }
  } else {
    if (payload.picture && !user.avatar) {
      user.avatar = payload.picture;
      await user.save();
    }
  }

  await issueSession(user, res);
  return user.toSafeJSON();
}

export async function refreshSession(req, res) {
  const raw = req.cookies?.[COOKIE_NAMES.refresh];
  if (!raw) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Missing refresh token");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(raw);
  } catch {
    clearAuthCookies(res);
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.sub).select("+refreshToken");
  if (!user?.refreshToken) {
    clearAuthCookies(res);
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Session expired");
  }

  const match = await compareRefreshToken(raw, user.refreshToken);
  if (!match) {
    user.refreshToken = null;
    await user.save();
    clearAuthCookies(res);
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Session invalidated");
  }

  await issueSession(user, res);
  return user.toSafeJSON();
}

export async function logoutUser(userId, res) {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  clearAuthCookies(res);
}

async function issueSession(user, res) {
  const accessToken = signAccessToken(String(user._id));
  const refreshToken = signRefreshToken(String(user._id));
  user.refreshToken = await hashRefreshToken(refreshToken);
  await user.save({ validateBeforeSave: false });
  attachAuthCookies(res, { accessToken, refreshToken });
}

async function uniqueUsernameFromEmail(email, displayName) {
  const baseRaw = displayName?.trim() || email.split("@")[0] || "user";
  const base = baseRaw.replace(/[^\w.-]/g, "").slice(0, 30) || "user";
  let candidate = base;
  let n = 0;
  while (await User.exists({ username: candidate })) {
    n += 1;
    candidate = `${base}${n}`;
  }
  return candidate;
}
