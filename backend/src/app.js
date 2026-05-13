import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { env } from "./config/env.js";
import { applySecurity } from "./middlewares/security.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
}

applySecurity(app);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use("/api", apiLimiter);
app.use("/api/v1", routes);

app.use(notFound);
app.use(errorMiddleware);

export default app;
