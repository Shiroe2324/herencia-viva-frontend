import type { UserClientGender } from './userClientGender';

/**
 * Represents a client profile associated with a user
 */
export interface UserClient {
  /** Unique client identifier (UUID format) */
  id: string;
  /**
   * Client phone number in international format
   * @nullable
   */
  phone: string | null;
  /**
   * Client gender for profile demographics
   * @nullable
   */
  gender: UserClientGender;
  /**
   * Client age in years
   * @minimum 18
   * @maximum 120
   * @nullable
   */
  age: number | null;
  /** ISO 8601 timestamp of client profile creation */
  created_at: string;
  /** ISO 8601 timestamp of last client profile update */
  updated_at: string;
}
