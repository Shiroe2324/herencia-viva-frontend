/**
 * Source of the picture (oauth provider, local upload, etc.)
 */
export type UserPictureOrigin = (typeof UserPictureOrigin)[keyof typeof UserPictureOrigin];

export const UserPictureOrigin = {
  local: 'local',
  external: 'external',
} as const;
