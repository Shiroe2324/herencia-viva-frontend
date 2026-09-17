import type { GetAllUsersSessionLogsOrderBy } from './getAllUsersSessionLogsOrderBy';
import type { GetAllUsersSessionLogsOrderDirection } from './getAllUsersSessionLogsOrderDirection';
import type { GetAllUsersSessionLogsSelectItem } from './getAllUsersSessionLogsSelectItem';

export type GetAllUsersSessionLogsParams = {
  /**
   * Sorting direction (ASC or DESC)
   */
  orderDirection?: GetAllUsersSessionLogsOrderDirection;
  /**
   * User field to sort by (e.g., username, createdAt)
   */
  orderBy?: GetAllUsersSessionLogsOrderBy;
  /**
   * Page number for pagination (starts at 1)
   * @minimum 1
   */
  page?: number;
  /**
   * Number of users per page
   * @minimum 1
   * @maximum 100
   */
  limit?: number;
  /**
   * User columns to include in response. Use repeated query keys (e.g., ?select=id&select=username). Nested relations (roles, picture, sessionLogs) can be selected in full (e.g., ?select=picture) or by field (e.g., ?select=picture.url); a relation is only joined when it, or one of its fields, is selected. Defaults to all public columns.
   */
  select?: GetAllUsersSessionLogsSelectItem[];
};
