/**
 * Client gender for profile demographics
 */
export type CreateClientRequestGender = (typeof CreateClientRequestGender)[keyof typeof CreateClientRequestGender];

export const CreateClientRequestGender = {
  male: 'male',
  female: 'female',
  prefer_not_to_say: 'prefer_not_to_say',
  other: 'other',
} as const;
