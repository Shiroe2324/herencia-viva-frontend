/**
 * Credentials required to disable MFA
 */
export interface DisableMFARequest {
  /**
   * User account password for identity verification
   * @minLength 6
   * @maxLength 36
   */
  password: string;
  /** TOTP code (6-digit) from authenticator application */
  token: string;
}
