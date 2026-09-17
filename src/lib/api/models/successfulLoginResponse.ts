/**
 * JWT tokens and session information after successful authentication
 */
export interface SuccessfulLoginResponse {
  /** JWT access token for accessing protected API resources */
  access_token: string;
  /** JWT refresh token for obtaining new access tokens when expired */
  refresh_token: string;
  /** Access token expiration duration in seconds */
  access_expires_in: number;
  /** Refresh token expiration duration in seconds */
  refresh_expires_in: number;
}
