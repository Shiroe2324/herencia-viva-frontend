import type { AuthSessionLogFailureReason } from './authSessionLogFailureReason';
import type { AuthSessionLogStatus } from './authSessionLogStatus';
import type { PublicUserProfile } from './publicUserProfile';

/**
 * Represents a login attempt (successful or failed) recorded for auditing and session management
 */
export interface AuthSessionLog {
  /** Unique session log identifier (UUID format) */
  id: string;
  /**
   * Stable session identifier shared with the access/refresh token pair created on a successful login
   * @nullable
   */
  session_id: string | null;
  /** Outcome of the login attempt (SUCCESS or FAILED) */
  status: AuthSessionLogStatus;
  /**
   * Reason the login attempt failed (null when the attempt succeeded)
   * @nullable
   */
  failure_reason: AuthSessionLogFailureReason;
  /**
   * IP address the login attempt originated from
   * @nullable
   */
  ip_address: string | null;
  /**
   * Browser parsed from the User-Agent header
   * @nullable
   */
  browser: string | null;
  /**
   * Operating system parsed from the User-Agent header
   * @nullable
   */
  os: string | null;
  /**
   * Device type parsed from the User-Agent header (mobile, tablet, desktop, etc.)
   * @nullable
   */
  device_type: string | null;
  /**
   * Country resolved from the IP address
   * @nullable
   */
  country: string | null;
  /**
   * City resolved from the IP address
   * @nullable
   */
  city: string | null;
  /** User account this login attempt is associated with */
  user: PublicUserProfile;
  /**
   * ISO 8601 timestamp when this session was closed (null while active)
   * @nullable
   */
  revoked_at: string | null;
  /** ISO 8601 timestamp of the login attempt */
  created_at: string;
}
