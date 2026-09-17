/**
 * Current password and new password for authenticated user
 */
export interface PasswordChangeRequest {
  /**
   * Current account password for verification
   * @minLength 6
   * @maxLength 36
   */
  current_password: string;
  /**
   * New password to set for the account
   * @minLength 6
   * @maxLength 36
   */
  new_password: string;
  /** TOTP code (6-digit, required if MFA is enabled on account) */
  token?: string;
}
