function unitToMs(unit) {
  switch (unit) {
    case "s":
      return 1000;
    case "m":
      return 60 * 1000;
    case "h":
      return 60 * 60 * 1000;
    case "d":
      return 24 * 60 * 60 * 1000;
    default:
      return 60 * 1000;
  }
}

export function parseExpiresInToMs(expiresIn) {
  const s = String(expiresIn).trim();
  const m = s.match(/^(\d+)([smhd])$/i);
  if (!m) return 15 * 60 * 1000;
  return Number(m[1]) * unitToMs(m[2].toLowerCase());
}
