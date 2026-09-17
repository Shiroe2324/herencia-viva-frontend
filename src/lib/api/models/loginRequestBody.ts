/**
 * User credentials for authentication
 */
export interface LoginRequestBody {
  /** User email address or username */
  identifier: string;
  /**
   * User account password
   * @minLength 6
   * @maxLength 36
   */
  password: string;
}
