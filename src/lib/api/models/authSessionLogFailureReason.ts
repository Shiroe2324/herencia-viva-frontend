/**
 * Reason the login attempt failed (null when the attempt succeeded)
 * @nullable
 */
export type AuthSessionLogFailureReason = (typeof AuthSessionLogFailureReason)[keyof typeof AuthSessionLogFailureReason] | null;

export const AuthSessionLogFailureReason = {
  invalid_password: 'invalid_password',
  invalid_mfa_token: 'invalid_mfa_token',
} as const;
