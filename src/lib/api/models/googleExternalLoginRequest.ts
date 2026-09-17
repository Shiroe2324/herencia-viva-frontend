/**
 * Contains Google ID token for authentication verification
 */
export interface GoogleExternalLoginRequest {
  /** Google OAuth2 ID token received from the Google SDK */
  token: string;
}
