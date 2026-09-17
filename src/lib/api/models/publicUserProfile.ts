import type { UserPicture } from './userPicture';
import type { UserRole } from './userRole';

/**
 * Publicly visible user profile information shown to other users
 */
export interface PublicUserProfile {
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
}
