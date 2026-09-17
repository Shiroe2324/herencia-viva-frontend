/**
 * Credentials and TOTP token required to verify and enable MFA
 */
export interface EnableMFARequest {
  /**
   * User account password for identity verification
   * @minLength 6
   * @maxLength 36
   */
  password: string;
  /** TOTP code (6-digit) from authenticator application */
  token: string;
  /** Temporary TOTP secret (Base32-encoded) from the generation step */
  base32: string;
}
