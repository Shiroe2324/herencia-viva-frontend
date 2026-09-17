/**
 * Response indicating MFA verification is required to complete login
 */
export interface MFAChallengeResponse {
  /** Boolean flag indicating MFA verification is needed */
  mfa_required: boolean;
  /** Temporary session identifier (UUID format) for MFA verification */
  otp_session_id: string;
}
