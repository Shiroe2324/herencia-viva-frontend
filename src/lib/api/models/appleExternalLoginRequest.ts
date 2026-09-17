/**
 * Contains Apple identity token for authentication verification
 */
export interface AppleExternalLoginRequest {
  /** Apple OAuth2 identity token received from the Apple SDK */
  token: string;
}
