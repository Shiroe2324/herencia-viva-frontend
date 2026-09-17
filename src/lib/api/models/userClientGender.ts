/**
 * Client gender for profile demographics
 * @nullable
 */
export type UserClientGender = (typeof UserClientGender)[keyof typeof UserClientGender] | null;

export const UserClientGender = {
  male: 'male',
  female: 'female',
  prefer_not_to_say: 'prefer_not_to_say',
  other: 'other',
} as const;
