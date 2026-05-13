import bcrypt from "bcryptjs";

export async function hashRefreshToken(rawToken) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(rawToken, salt);
}

export async function compareRefreshToken(rawToken, storedHash) {
  if (!rawToken || !storedHash) return false;
  return bcrypt.compare(rawToken, storedHash);
}
