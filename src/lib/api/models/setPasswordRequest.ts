/**
 * Initial password for OAuth users
 */
export interface SetPasswordRequest {
  /**
   * The password to set for the account
   * @minLength 6
   * @maxLength 36
   */
  new_password: string;
}
