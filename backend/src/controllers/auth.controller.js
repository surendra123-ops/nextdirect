import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../helpers/apiResponse.js";
import { HttpStatus } from "../constants/httpStatus.js";
import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body, res);
  return sendSuccess(res, { statusCode: HttpStatus.CREATED, message: "Account created", data: { user } });
});

export const login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(req.body, res);
  return sendSuccess(res, { message: "Signed in", data: { user } });
});

export const google = asyncHandler(async (req, res) => {
  const user = await authService.googleAuth(req.body, res);
  return sendSuccess(res, { message: "Signed in", data: { user } });
});

export const refresh = asyncHandler(async (req, res) => {
  const user = await authService.refreshSession(req, res);
  return sendSuccess(res, { message: "Session refreshed", data: { user } });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.userId, res);
  return sendSuccess(res, { message: "Signed out", data: null });
});
