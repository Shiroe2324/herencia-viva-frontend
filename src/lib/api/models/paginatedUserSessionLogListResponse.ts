import type { UserSessionLogs } from './userSessionLogs';

/**
 * Paginated list of users, each including all of their login session logs
 */
export interface PaginatedUserSessionLogListResponse {
  /** Total number of users */
  total: number;
  /** Current page number */
  page: number;
  /** Number of users per page */
  limit: number;
  /** Total number of pages available */
  total_pages: number;
  /** Array of users, each including all of their login session logs */
  users: UserSessionLogs[];
}
