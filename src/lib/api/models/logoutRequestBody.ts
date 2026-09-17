/**
 * Token to revoke during logout
 */
export interface LogoutRequestBody {
  /** Refresh token to invalidate and end the session */
  token: string;
}
