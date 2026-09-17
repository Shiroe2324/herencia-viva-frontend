/**
 * Identifier used to locate the deleted account
 */
export interface SendRecoveryEmailRequest {
  /** User ID (UUID format), username, or email address */
  identifier: string;
}
