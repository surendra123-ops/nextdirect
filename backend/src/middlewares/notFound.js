import { HttpStatus } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, res, next) {
  next(new ApiError(HttpStatus.NOT_FOUND, Messages.NOT_FOUND));
}
