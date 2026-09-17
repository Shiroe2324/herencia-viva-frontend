/**
 * JWT tokens issued after successful Apple authentication
 */
export interface AppleAuthenticationResponse {
  /** JWT access token for accessing protected API resources */
  access_token: string;
  /** JWT refresh token for obtaining new access tokens when the current one expires */
  refresh_token: string;
  /** Access token expiration duration in seconds */
  access_expires_in: number;
  /** Refresh token expiration duration in seconds */
  refresh_expires_in: number;
}
