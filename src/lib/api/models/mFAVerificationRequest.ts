/**
 * Session ID and TOTP token for login completion
 */
export interface MFAVerificationRequest {
  /** Temporary session ID (UUID format) received from initial login attempt */
  otp_session_id: string;
  /** TOTP code (6-digit) from authenticator application */
  token: string;
}
