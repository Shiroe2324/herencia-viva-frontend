/**
 * Recovery token sent to the user email
 */
export interface AccountRecoveryRequest {
  /** Account recovery token from email link */
  token: string;
}
