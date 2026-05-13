import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";
import { sendError } from "../helpers/apiResponse.js";
import { env } from "../config/env.js";

export function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || Messages.INTERNAL_ERROR;
  let details = err.details ?? null;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (err.name === "ValidationError") {
    statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    message = Messages.INVALID_PAYLOAD;
    details = formatMongooseValidation(err);
  } else if (err.code === 11000) {
    statusCode = HttpStatus.CONFLICT;
    message = "Duplicate field value";
    details = formatDuplicateKey(err);
  } else if (err.name === "CastError") {
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Invalid identifier";
  } else if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = "Invalid or expired token";
  }

  if (statusCode >= 500 && env.isProd) {
    message = Messages.INTERNAL_ERROR;
    details = null;
  }

  return sendError(res, { statusCode, message, errors: details });
}

function formatMongooseValidation(err) {
  if (!err.errors) return null;
  return Object.values(err.errors).map((e) => e.message);
}

function formatDuplicateKey(err) {
  const field = err.keyValue ? Object.keys(err.keyValue)[0] : null;
  return field ? { field } : null;
}
