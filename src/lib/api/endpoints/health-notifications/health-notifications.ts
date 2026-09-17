import { useQuery } from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  ActiveSseEvent,
  CompletedSseEvent,
  ErrorSseEvent,
  FailedSseEvent,
  ProgressSseEvent,
  StalledSseEvent,
  StreamJobNotificationsParams,
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

export type streamJobNotificationsResponse200 = {
  data: ActiveSseEvent | ProgressSseEvent | CompletedSseEvent | FailedSseEvent | StalledSseEvent | ErrorSseEvent;
  status: 200;
};

export type streamJobNotificationsResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type streamJobNotificationsResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type streamJobNotificationsResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type streamJobNotificationsResponseSuccess = streamJobNotificationsResponse200 & {
  headers: Headers;
};
export type streamJobNotificationsResponseError = (
  streamJobNotificationsResponse401 | streamJobNotificationsResponse422 | streamJobNotificationsResponse429
) & {
  headers: Headers;
};

export type streamJobNotificationsResponse = streamJobNotificationsResponseSuccess | streamJobNotificationsResponseError;

export const getStreamJobNotificationsUrl = (params: StreamJobNotificationsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/health/notifications/jobs?${stringifiedParams}` : `/health/notifications/jobs`;
};

/**
 * Provides a real-time SSE stream of BullMQ job lifecycle events for queued background work, including active, progress, completed, failed, stalled, and error notifications.
 * @summary Stream job notifications
 */
export const streamJobNotifications = async (
  params: StreamJobNotificationsParams,
  options?: Parameters<typeof customFetch>[1],
): Promise<streamJobNotificationsResponse> => {
  return customFetch<streamJobNotificationsResponse>(getStreamJobNotificationsUrl(params), {
    ...options,
    method: 'GET',
  });
};

export const getStreamJobNotificationsQueryKey = (params?: StreamJobNotificationsParams) => {
  return [`/health/notifications/jobs`, ...(params ? [params] : [])] as const;
};

export const getStreamJobNotificationsQueryOptions = <
  TData = Awaited<ReturnType<typeof streamJobNotifications>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params: StreamJobNotificationsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getStreamJobNotificationsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof streamJobNotifications>>> = ({ signal }) =>
    streamJobNotifications(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type StreamJobNotificationsQueryResult = NonNullable<Awaited<ReturnType<typeof streamJobNotifications>>>;
export type StreamJobNotificationsQueryError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429;

export function useStreamJobNotifications<
  TData = Awaited<ReturnType<typeof streamJobNotifications>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params: StreamJobNotificationsParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, Awaited<ReturnType<typeof streamJobNotifications>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useStreamJobNotifications<
  TData = Awaited<ReturnType<typeof streamJobNotifications>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params: StreamJobNotificationsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, Awaited<ReturnType<typeof streamJobNotifications>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useStreamJobNotifications<
  TData = Awaited<ReturnType<typeof streamJobNotifications>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params: StreamJobNotificationsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Stream job notifications
 */

export function useStreamJobNotifications<
  TData = Awaited<ReturnType<typeof streamJobNotifications>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params: StreamJobNotificationsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof streamJobNotifications>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getStreamJobNotificationsQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}
