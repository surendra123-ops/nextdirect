import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { readAccessToken } from "../utils/cookieAuth.js";
import { ApiError } from "../utils/ApiError.js";
import { HttpStatus } from "../constants/httpStatus.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = readAccessToken(req);
  if (!token) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Not authenticated");
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Not authenticated");
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Not authenticated");
  }

  req.userId = String(user._id);
  req.user = user;
  next();
});
