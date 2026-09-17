/**
 * User profile fields to update
 */
export interface UserPatchRequest {
  /**
   * New unique username for login
   * @minLength 3
   * @maxLength 36
   * @pattern ^[a-z0-9]+$
   */
  username?: string;
  /**
   * New public display name shown to other users
   * @minLength 3
   * @maxLength 50
   */
  display_name?: string;
}
