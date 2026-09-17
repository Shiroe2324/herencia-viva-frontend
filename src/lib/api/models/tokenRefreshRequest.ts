/**
 * Refresh token to exchange for new tokens
 */
export interface TokenRefreshRequest {
  /** Valid refresh token from a previous authentication */
  token: string;
}
