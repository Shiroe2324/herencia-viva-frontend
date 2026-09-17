import type { PublicUserProfile } from './publicUserProfile';

/**
 * Paginated list of users with metadata
 */
export interface PaginatedUserListResponse {
  /** Total number of users in the system */
  total: number;
  /** Current page number */
  page: number;
  /** Number of users per page */
  limit: number;
  /** Total number of pages available */
  total_pages: number;
  /** Array of user objects */
  users: PublicUserProfile[];
}
