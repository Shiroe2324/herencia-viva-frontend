import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  AuthSessionLog,
  CloseOtherSessionsResponse,
  Forbidden403,
  GetAllSessionLogsParams,
  GetAllUsersSessionLogsParams,
  NotFound404,
  PaginatedSessionLogListResponse,
  PaginatedUserSessionLogListResponse,
  TooManyRequests429,
  Unauthorized401,
  ValidationErrorResponse,
} from '../../models';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

const withQueryKey = <T extends object, K>(query: T, queryKey: K): T & { queryKey: K } => {
  const result = { queryKey } as T & { queryKey: K };
  for (const key of Object.keys(query)) {
    // The explicit queryKey always wins, matching the previous
    // `{ ...query, queryKey }` spread where it was set last.
    if (key === 'queryKey') continue;
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: () => (query as Record<string, unknown>)[key],
    });
  }
  return result;
};

export type getAllUsersSessionLogsResponse200 = {
  data: PaginatedUserSessionLogListResponse;
  status: 200;
};

export type getAllUsersSessionLogsResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getAllUsersSessionLogsResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type getAllUsersSessionLogsResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type getAllUsersSessionLogsResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getAllUsersSessionLogsResponseSuccess = getAllUsersSessionLogsResponse200 & {
  headers: Headers;
};
export type getAllUsersSessionLogsResponseError = (
  getAllUsersSessionLogsResponse401 | getAllUsersSessionLogsResponse403 | getAllUsersSessionLogsResponse422 | getAllUsersSessionLogsResponse429
) & {
  headers: Headers;
};

export type getAllUsersSessionLogsResponse = getAllUsersSessionLogsResponseSuccess | getAllUsersSessionLogsResponseError;

export const getGetAllUsersSessionLogsUrl = (params?: GetAllUsersSessionLogsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ['select'];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? 'null' : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/auth/sessions?${stringifiedParams}` : `/auth/sessions`;
};

/**
 * Retrieves a paginated list of all users, each including their complete login session log history. Restricted to technical support
 * @summary List All Users With Session Logs
 */
export const getAllUsersSessionLogs = async (
  params?: GetAllUsersSessionLogsParams,
  options?: Parameters<typeof customFetch>[1],
): Promise<getAllUsersSessionLogsResponse> => {
  return customFetch<getAllUsersSessionLogsResponse>(getGetAllUsersSessionLogsUrl(params), {
    ...options,
    method: 'GET',
  });
};

export const getGetAllUsersSessionLogsQueryKey = (params?: GetAllUsersSessionLogsParams) => {
  return [`/auth/sessions`, ...(params ? [params] : [])] as const;
};

export const getGetAllUsersSessionLogsQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllUsersSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllUsersSessionLogsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllUsersSessionLogs>>> = ({ signal }) =>
    getAllUsersSessionLogs(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GetAllUsersSessionLogsQueryResult = NonNullable<Awaited<ReturnType<typeof getAllUsersSessionLogs>>>;
export type GetAllUsersSessionLogsQueryError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429;

export function useGetAllUsersSessionLogs<
  TData = Awaited<ReturnType<typeof getAllUsersSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params: undefined | GetAllUsersSessionLogsParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, Awaited<ReturnType<typeof getAllUsersSessionLogs>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllUsersSessionLogs<
  TData = Awaited<ReturnType<typeof getAllUsersSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, Awaited<ReturnType<typeof getAllUsersSessionLogs>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllUsersSessionLogs<
  TData = Awaited<ReturnType<typeof getAllUsersSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary List All Users With Session Logs
 */

export function useGetAllUsersSessionLogs<
  TData = Awaited<ReturnType<typeof getAllUsersSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsersSessionLogs>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetAllUsersSessionLogsQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type getCurrentSessionLogResponse200 = {
  data: AuthSessionLog;
  status: 200;
};

export type getCurrentSessionLogResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getCurrentSessionLogResponse404 = {
  data: NotFound404;
  status: 404;
};

export type getCurrentSessionLogResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getCurrentSessionLogResponseSuccess = getCurrentSessionLogResponse200 & {
  headers: Headers;
};
export type getCurrentSessionLogResponseError = (
  getCurrentSessionLogResponse401 | getCurrentSessionLogResponse404 | getCurrentSessionLogResponse429
) & {
  headers: Headers;
};

export type getCurrentSessionLogResponse = getCurrentSessionLogResponseSuccess | getCurrentSessionLogResponseError;

export const getGetCurrentSessionLogUrl = () => {
  return `/auth/sessions/current`;
};

/**
 * Retrieves the login session log tied to the access token used for this request
 * @summary Get Current Session
 */
export const getCurrentSessionLog = async (options?: Parameters<typeof customFetch>[1]): Promise<getCurrentSessionLogResponse> => {
  return customFetch<getCurrentSessionLogResponse>(getGetCurrentSessionLogUrl(), {
    ...options,
    method: 'GET',
  });
};

export const getGetCurrentSessionLogQueryKey = () => {
  return [`/auth/sessions/current`] as const;
};

export const getGetCurrentSessionLogQueryOptions = <
  TData = Awaited<ReturnType<typeof getCurrentSessionLog>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, TData>>;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetCurrentSessionLogQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getCurrentSessionLog>>> = ({ signal }) =>
    getCurrentSessionLog({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GetCurrentSessionLogQueryResult = NonNullable<Awaited<ReturnType<typeof getCurrentSessionLog>>>;
export type GetCurrentSessionLogQueryError = Unauthorized401 | NotFound404 | TooManyRequests429;

export function useGetCurrentSessionLog<
  TData = Awaited<ReturnType<typeof getCurrentSessionLog>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, Awaited<ReturnType<typeof getCurrentSessionLog>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetCurrentSessionLog<
  TData = Awaited<ReturnType<typeof getCurrentSessionLog>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, Awaited<ReturnType<typeof getCurrentSessionLog>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetCurrentSessionLog<
  TData = Awaited<ReturnType<typeof getCurrentSessionLog>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get Current Session
 */

export function useGetCurrentSessionLog<
  TData = Awaited<ReturnType<typeof getCurrentSessionLog>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentSessionLog>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetCurrentSessionLogQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type getAllSessionLogsResponse200 = {
  data: PaginatedSessionLogListResponse;
  status: 200;
};

export type getAllSessionLogsResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getAllSessionLogsResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type getAllSessionLogsResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type getAllSessionLogsResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getAllSessionLogsResponseSuccess = getAllSessionLogsResponse200 & {
  headers: Headers;
};
export type getAllSessionLogsResponseError = (
  getAllSessionLogsResponse401 | getAllSessionLogsResponse403 | getAllSessionLogsResponse422 | getAllSessionLogsResponse429
) & {
  headers: Headers;
};

export type getAllSessionLogsResponse = getAllSessionLogsResponseSuccess | getAllSessionLogsResponseError;

export const getGetAllSessionLogsUrl = (identifier: string, params?: GetAllSessionLogsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ['select'];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? 'null' : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/auth/sessions/${identifier}?${stringifiedParams}` : `/auth/sessions/${identifier}`;
};

/**
 * Retrieves a paginated list of login attempts (successful and failed) for a specific user or the current user
 * @summary List Login Session Logs
 */
export const getAllSessionLogs = async (
  identifier: string,
  params?: GetAllSessionLogsParams,
  options?: Parameters<typeof customFetch>[1],
): Promise<getAllSessionLogsResponse> => {
  return customFetch<getAllSessionLogsResponse>(getGetAllSessionLogsUrl(identifier, params), {
    ...options,
    method: 'GET',
  });
};

export const getGetAllSessionLogsQueryKey = (identifier: string, params?: GetAllSessionLogsParams) => {
  return [`/auth/sessions/${identifier}`, ...(params ? [params] : [])] as const;
};

export const getGetAllSessionLogsQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  identifier: string,
  params?: GetAllSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllSessionLogs>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllSessionLogsQueryKey(identifier, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllSessionLogs>>> = ({ signal }) =>
    getAllSessionLogs(identifier, params, { signal, ...requestOptions });

  return { queryKey, queryFn, enabled: identifier !== null && identifier !== undefined, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getAllSessionLogs>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetAllSessionLogsQueryResult = NonNullable<Awaited<ReturnType<typeof getAllSessionLogs>>>;
export type GetAllSessionLogsQueryError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429;

export function useGetAllSessionLogs<
  TData = Awaited<ReturnType<typeof getAllSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  identifier: string,
  params: undefined | GetAllSessionLogsParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllSessionLogs>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof getAllSessionLogs>>, TError, Awaited<ReturnType<typeof getAllSessionLogs>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllSessionLogs<
  TData = Awaited<ReturnType<typeof getAllSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  identifier: string,
  params?: GetAllSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllSessionLogs>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof getAllSessionLogs>>, TError, Awaited<ReturnType<typeof getAllSessionLogs>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllSessionLogs<
  TData = Awaited<ReturnType<typeof getAllSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  identifier: string,
  params?: GetAllSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllSessionLogs>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary List Login Session Logs
 */

export function useGetAllSessionLogs<
  TData = Awaited<ReturnType<typeof getAllSessionLogs>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  identifier: string,
  params?: GetAllSessionLogsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllSessionLogs>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetAllSessionLogsQueryOptions(identifier, params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type closeOtherSessionsResponse200 = {
  data: CloseOtherSessionsResponse;
  status: 200;
};

export type closeOtherSessionsResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type closeOtherSessionsResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type closeOtherSessionsResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type closeOtherSessionsResponseSuccess = closeOtherSessionsResponse200 & {
  headers: Headers;
};
export type closeOtherSessionsResponseError = (closeOtherSessionsResponse401 | closeOtherSessionsResponse403 | closeOtherSessionsResponse429) & {
  headers: Headers;
};

export type closeOtherSessionsResponse = closeOtherSessionsResponseSuccess | closeOtherSessionsResponseError;

export const getCloseOtherSessionsUrl = (identifier: string) => {
  return `/auth/sessions/${identifier}/others`;
};

/**
 * Closes every other active login session for a user. For "me" this excludes the session tied to the current access token; for another user (admin only) every active session is closed, since the request carries no session of theirs to preserve
 * @summary Close Other Sessions
 */
export const closeOtherSessions = async (identifier: string, options?: Parameters<typeof customFetch>[1]): Promise<closeOtherSessionsResponse> => {
  return customFetch<closeOtherSessionsResponse>(getCloseOtherSessionsUrl(identifier), {
    ...options,
    method: 'DELETE',
  });
};

export const getCloseOtherSessionsMutationOptions = <TError = Unauthorized401 | Forbidden403 | TooManyRequests429, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof closeOtherSessions>>, TError, { identifier: string }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof closeOtherSessions>>, TError, { identifier: string }, TContext> => {
  const mutationKey = ['closeOtherSessions'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof closeOtherSessions>>, { identifier: string }> = (props) => {
    const { identifier } = props ?? {};

    return closeOtherSessions(identifier, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CloseOtherSessionsMutationResult = NonNullable<Awaited<ReturnType<typeof closeOtherSessions>>>;

export type CloseOtherSessionsMutationError = Unauthorized401 | Forbidden403 | TooManyRequests429;

/**
 * @summary Close Other Sessions
 */
export const useCloseOtherSessions = <TError = Unauthorized401 | Forbidden403 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof closeOtherSessions>>, TError, { identifier: string }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof closeOtherSessions>>, TError, { identifier: string }, TContext> => {
  return useMutation(getCloseOtherSessionsMutationOptions(options), queryClient);
};
export type closeSessionResponse204 = {
  data: void;
  status: 204;
};

export type closeSessionResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type closeSessionResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type closeSessionResponse404 = {
  data: NotFound404;
  status: 404;
};

export type closeSessionResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type closeSessionResponseSuccess = closeSessionResponse204 & {
  headers: Headers;
};
export type closeSessionResponseError = (closeSessionResponse401 | closeSessionResponse403 | closeSessionResponse404 | closeSessionResponse429) & {
  headers: Headers;
};

export type closeSessionResponse = closeSessionResponseSuccess | closeSessionResponseError;

export const getCloseSessionUrl = (identifier: string, sessionId: string) => {
  return `/auth/sessions/${identifier}/${sessionId}`;
};

/**
 * Closes one specific active login session for a user and blacklists its tokens
 * @summary Close Session
 */
export const closeSession = async (
  identifier: string,
  sessionId: string,
  options?: Parameters<typeof customFetch>[1],
): Promise<closeSessionResponse> => {
  return customFetch<closeSessionResponse>(getCloseSessionUrl(identifier, sessionId), {
    ...options,
    method: 'DELETE',
  });
};

export const getCloseSessionMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof closeSession>>, TError, { identifier: string; sessionId: string }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof closeSession>>, TError, { identifier: string; sessionId: string }, TContext> => {
  const mutationKey = ['closeSession'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof closeSession>>, { identifier: string; sessionId: string }> = (props) => {
    const { identifier, sessionId } = props ?? {};

    return closeSession(identifier, sessionId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CloseSessionMutationResult = NonNullable<Awaited<ReturnType<typeof closeSession>>>;

export type CloseSessionMutationError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429;

/**
 * @summary Close Session
 */
export const useCloseSession = <TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof closeSession>>, TError, { identifier: string; sessionId: string }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof closeSession>>, TError, { identifier: string; sessionId: string }, TContext> => {
  return useMutation(getCloseSessionMutationOptions(options), queryClient);
};
