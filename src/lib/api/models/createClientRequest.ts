import type { CreateClientRequestGender } from './createClientRequestGender';

/**
 * Required client profile fields to complete onboarding
 */
export interface CreateClientRequest {
  /**
   * Client phone number in international format (E.164)
   * @pattern ^\+[1-9]\d{7,14}$
   */
  phone: string;
  /** Client gender for profile demographics */
  gender: CreateClientRequestGender;
  /**
   * Client age in years
   * @minimum 14
   * @maximum 120
   */
  age: number;
}
