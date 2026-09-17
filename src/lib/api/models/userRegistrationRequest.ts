import type { UserRegistrationRequestGender } from './userRegistrationRequestGender';

/**
 * User information required for account creation
 */
export interface UserRegistrationRequest {
  /** Email address for account login and verification */
  email: string;
  /**
   * Account password (must meet security requirements)
   * @minLength 6
   * @maxLength 36
   */
  password: string;
  /**
   * Unique username for public identification
   * @minLength 3
   * @maxLength 36
   * @pattern ^[a-z0-9]+$
   */
  username?: string;
  /**
   * Public display name shown to other users
   * @minLength 3
   * @maxLength 50
   */
  display_name?: string;
  /**
   * Client phone number in international format (E.164)
   * @pattern ^\+[1-9]\d{7,14}$
   */
  phone: string;
  /** Client gender for profile demographics */
  gender: UserRegistrationRequestGender;
  /**
   * Client age in years
   * @minimum 14
   * @maximum 120
   */
  age: number;
}
