/**
 * Represents user MFA security configuration and recovery credentials
 */
export interface UserMfa {
  /** Unique MFA profile identifier (UUID format) */
  id: string;
  /** Whether Multi-Factor Authentication is enabled for this account */
  enabled: boolean;
  /** ISO 8601 timestamp of MFA profile creation */
  created_at: string;
  /** ISO 8601 timestamp of last MFA profile update */
  updated_at: string;
}
