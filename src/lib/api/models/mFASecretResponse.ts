/**
 * TOTP secret key and QR code for authenticator app setup
 */
export interface MFASecretResponse {
  /** Base32-encoded TOTP secret key for manual entry in authenticator apps */
  base32: string;
  /** OTPAuth URL (URI format) for direct import into authenticator applications */
  otpauth_url: string;
  /** QR code image (Base64-encoded) for authenticator app scanning */
  qr: string;
}
