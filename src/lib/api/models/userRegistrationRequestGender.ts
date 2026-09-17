/**
 * Client gender for profile demographics
 */
export type UserRegistrationRequestGender = (typeof UserRegistrationRequestGender)[keyof typeof UserRegistrationRequestGender];

export const UserRegistrationRequestGender = {
  male: 'male',
  female: 'female',
  prefer_not_to_say: 'prefer_not_to_say',
  other: 'other',
} as const;
