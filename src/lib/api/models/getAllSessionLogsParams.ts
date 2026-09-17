import type { GetAllSessionLogsOrderBy } from './getAllSessionLogsOrderBy';
import type { GetAllSessionLogsOrderDirection } from './getAllSessionLogsOrderDirection';
import type { GetAllSessionLogsSelectItem } from './getAllSessionLogsSelectItem';

export type GetAllSessionLogsParams = {
  /**
   * Sorting direction (ASC or DESC)
   */
  orderDirection?: GetAllSessionLogsOrderDirection;
  /**
   * Field to sort by (e.g., createdAt, status)
   */
  orderBy?: GetAllSessionLogsOrderBy;
  /**
   * Page number for pagination (starts at 1)
   * @minimum 1
   */
  page?: number;
  /**
   * Number of results per page
   * @minimum 1
   */
  limit?: number;
  /**
   * Columns to include in response. Use repeated query keys (e.g., ?select=id&select=status). The nested user can be selected in full (e.g., ?select=user) or by field (e.g., ?select=user.username); it is only joined when selected. Defaults to all columns.
   */
  select?: GetAllSessionLogsSelectItem[];
};
