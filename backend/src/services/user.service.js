import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { HttpStatus } from "../constants/httpStatus.js";

export async function getProfileById(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
  }
  return user.toSafeJSON();
}

export async function updateUserProfile(userId, payload) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
  }

  const { username, avatar, bio } = payload;
  if (username !== undefined) user.username = username;
  if (avatar !== undefined) user.avatar = avatar;
  if (bio !== undefined) user.bio = bio;

  await user.save();
  return user.toSafeJSON();
}
