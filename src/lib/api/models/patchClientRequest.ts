import type { PatchClientRequestGender } from './patchClientRequestGender';

/**
 * Client fields to update
 */
export interface PatchClientRequest {
  /**
   * Client phone number in international format (E.164)
   * @pattern ^\+[1-9]\d{7,14}$
   */
  phone?: string;
  /** Client gender for profile demographics */
  gender?: PatchClientRequestGender;
  /**
   * Client age in years
   * @minimum 14
   * @maximum 120
   */
  age?: number;
}
