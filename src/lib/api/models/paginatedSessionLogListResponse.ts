import type { AuthSessionLog } from './authSessionLog';

/**
 * Paginated list of login session logs with metadata
 */
export interface PaginatedSessionLogListResponse {
  /** Total number of session logs for this user */
  total: number;
  /** Current page number */
  page: number;
  /** Number of session logs per page */
  limit: number;
  /** Total number of pages available */
  total_pages: number;
  /** Array of login session log objects */
  session_logs: AuthSessionLog[];
}
