import type { UserRoleName } from './userRoleName';

/**
 * Represents a role or permission level assigned to a user
 */
export interface UserRole {
  /** Unique role identifier (UUID format) */
  id: string;
  /** Role name for permission and access level identification */
  name: UserRoleName;
}
