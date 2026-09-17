/**
 * Outcome of the login attempt (SUCCESS or FAILED)
 */
export type AuthSessionLogStatus = (typeof AuthSessionLogStatus)[keyof typeof AuthSessionLogStatus];

export const AuthSessionLogStatus = {
  success: 'success',
  failed: 'failed',
} as const;
