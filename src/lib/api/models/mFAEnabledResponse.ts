/**
 * Backup codes and confirmation after successful MFA activation
 */
export interface MFAEnabledResponse {
  /** Array of one-time backup codes for account recovery if authenticator device is lost */
  backup_codes: string[];
}
