import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { HttpStatus } from "../constants/httpStatus.js";

export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(HttpStatus.UNPROCESSABLE_ENTITY, "Validation failed", errors.array()));
  }
  next();
}
