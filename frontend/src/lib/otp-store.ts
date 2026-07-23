// In-memory store for the scaffold only. Replace with Redis (key: mobile,
// value: { otp, expiresAt, attempts }) before shipping — this map is lost
// on every server restart/redeploy and won't work across multiple instances.
export const otpStore = new Map<string, { otp: string; expiresAt: number }>();
