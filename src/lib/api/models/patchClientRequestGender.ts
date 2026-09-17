/**
 * Client gender for profile demographics
 */
export type PatchClientRequestGender = (typeof PatchClientRequestGender)[keyof typeof PatchClientRequestGender];

export const PatchClientRequestGender = {
  male: 'male',
  female: 'female',
  prefer_not_to_say: 'prefer_not_to_say',
  other: 'other',
} as const;
