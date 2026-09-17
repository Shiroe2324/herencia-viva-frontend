/**
 * Reset token and new password for account recovery
 */
export interface PasswordResetConfirmation {
  /** Password reset token from the email link */
  token: string;
  /**
   * The new password to set for the account
   * @minLength 6
   * @maxLength 36
   */
  new_password: string;
}
