import type { GetAllUsersOrderBy } from './getAllUsersOrderBy';
import type { GetAllUsersOrderDirection } from './getAllUsersOrderDirection';
import type { GetAllUsersSelectItem } from './getAllUsersSelectItem';

export type GetAllUsersParams = {
  /**
   * Sorting direction (ASC or DESC)
   */
  orderDirection?: GetAllUsersOrderDirection;
  /**
   * Field to sort by (e.g., createdAt, username)
   */
  orderBy?: GetAllUsersOrderBy;
  /**
   * Page number for pagination (starts at 1)
   * @minimum 1
   */
  page?: number;
  /**
   * Number of results per page
   * @minimum 1
   * @maximum 100
   */
  limit?: number;
  /**
   * Columns to include in response. Use repeated query keys (e.g., ?select=id&select=username). Nested relations (roles, picture) can be selected in full (e.g., ?select=picture) or by field (e.g., ?select=picture.url); a relation is only joined when it, or one of its fields, is selected. Defaults to all public columns.
   */
  select?: GetAllUsersSelectItem[];
};
