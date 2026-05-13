import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import sanitizeHtml from "sanitize-html";
import { env } from "../config/env.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = env.clientOrigin.split(",").map((s) => s.trim());
    if (allowed.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: true,
  optionsSuccessStatus: 204,
};

export function applySecurity(app) {
  app.set("trust proxy", 1);
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cors(corsOptions));
  app.use(mongoSanitize({ replaceWith: "_" }));
  app.use(sanitizeRequestBody);
}

function sanitizeRequestBody(req, res, next) {
  if (req.body && typeof req.body === "object") {
    req.body = deepSanitize(req.body);
  }
  next();
}

function deepSanitize(value) {
  if (typeof value === "string") {
    return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
  }
  if (Array.isArray(value)) {
    return value.map(deepSanitize);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepSanitize(v)]));
  }
  return value;
}
