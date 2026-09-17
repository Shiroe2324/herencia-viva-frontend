import type { UserMfa } from './userMfa';
import type { UserPicture } from './userPicture';
import type { UserRole } from './userRole';

/**
 * Complete profile information for the authenticated user (private fields included)
 */
export interface CurrentUserProfile {
  /** Unique user identifier (UUID format) */
  id: string;
  /**
   * Unique username for login and identification
   * @minLength 3
   * @maxLength 36
   */
  username: string;
  /**
   * Public name displayed for other users
   * @minLength 3
   * @maxLength 50
   * @nullable
   */
  display_name: string | null;
  /** Whether the user has verified their email address */
  is_email_verified: boolean;
  /** List of roles and permission levels assigned to the user */
  roles: UserRole[];
  /** User profile picture or avatar information */
  picture: UserPicture | null;
  /** ISO 8601 timestamp of account creation */
  created_at: string;
  /** User email address (only visible to account owner) */
  email: string;
  /**
   * ISO 8601 timestamp of the most recent login (only visible to account owner)
   * @nullable
   */
  last_login_at: string | null;
  /** Multi-Factor Authentication profile linked to this user account */
  mfa: UserMfa | null;
  /** ISO 8601 timestamp of last profile update (only visible to account owner) */
  updated_at: string;
}
