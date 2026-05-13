export function errorMessage(error) {
  const msg = error?.response?.data?.message;
  if (typeof msg === "string" && msg.trim()) return msg;
  if (error?.message) return error.message;
  return "Something went wrong";
}
