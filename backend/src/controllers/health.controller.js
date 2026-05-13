import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../helpers/apiResponse.js";
import { Messages } from "../constants/messages.js";

export const getHealth = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: Messages.SERVER_RUNNING,
    data: { uptime: process.uptime(), timestamp: new Date().toISOString() },
  });
});
