/**
 * New JWT tokens for continued session access
 */
export interface TokenRefreshResponse {
  /** New JWT access token for API resource access */
  access_token: string;
  /** New JWT refresh token for future token refreshes */
  refresh_token: string;
  /** New access token expiration duration in seconds */
  access_expires_in: number;
  /** New refresh token expiration duration in seconds */
  refresh_expires_in: number;
}
