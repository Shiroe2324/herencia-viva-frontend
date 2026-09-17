/**
 * Role name for permission and access level identification
 */
export type UserRoleName = (typeof UserRoleName)[keyof typeof UserRoleName];

export const UserRoleName = {
  developer: 'developer',
  admin: 'admin',
  user: 'user',
} as const;
