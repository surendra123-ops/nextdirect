import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../helpers/apiResponse.js";
import * as userService from "../services/user.service.js";

export const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getProfileById(req.userId);
  return sendSuccess(res, { data: { user } });
});

export const updateMe = asyncHandler(async (req, res) => {
  const user = await userService.updateUserProfile(req.userId, req.body);
  return sendSuccess(res, { message: "Profile updated", data: { user } });
});
