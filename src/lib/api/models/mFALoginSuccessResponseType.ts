/**
 * MFA verification method used (TOTP, backup code, etc.)
 */
export type MFALoginSuccessResponseType = (typeof MFALoginSuccessResponseType)[keyof typeof MFALoginSuccessResponseType];

export const MFALoginSuccessResponseType = {
  totp: 'totp',
  backup: 'backup',
} as const;
