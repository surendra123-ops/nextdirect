import rateLimit from "express-rate-limit";
import { HttpStatus } from "../constants/httpStatus.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: envSafeMax(),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, try again later" },
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: authMax(),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many auth attempts, try again later" },
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
});

function authMax() {
  const raw = process.env.AUTH_RATE_LIMIT_MAX;
  const n = raw ? Number(raw) : 30;
  return Number.isFinite(n) && n > 0 ? n : 30;
}

function envSafeMax() {
  const raw = process.env.RATE_LIMIT_MAX;
  const n = raw ? Number(raw) : 300;
  return Number.isFinite(n) && n > 0 ? n : 300;
}
