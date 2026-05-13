import { HttpStatus } from "../constants/httpStatus.js";

export function sendSuccess(res, { data = null, message = "OK", statusCode = HttpStatus.OK } = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res, { message, statusCode = HttpStatus.BAD_REQUEST, errors = null } = {}) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}
