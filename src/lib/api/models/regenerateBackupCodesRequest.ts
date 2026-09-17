/**
 * Credentials required to regenerate backup codes
 */
export interface RegenerateBackupCodesRequest {
  /**
   * User account password for identity confirmation
   * @minLength 6
   * @maxLength 36
   */
  password: string;
  /** TOTP code (6-digit) from authenticator application */
  token: string;
}
