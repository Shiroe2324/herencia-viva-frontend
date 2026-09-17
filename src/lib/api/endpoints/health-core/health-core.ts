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
import type { HealthCoreControllerCheck200, HealthCoreControllerCheck503, TooManyRequests429 } from '../../models';

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

export type healthCoreControllerCheckResponse200 = {
  data: HealthCoreControllerCheck200;
  status: 200;
};

export type healthCoreControllerCheckResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type healthCoreControllerCheckResponse503 = {
  data: HealthCoreControllerCheck503;
  status: 503;
};

export type healthCoreControllerCheckResponseSuccess = healthCoreControllerCheckResponse200 & {
  headers: Headers;
};
export type healthCoreControllerCheckResponseError = (healthCoreControllerCheckResponse429 | healthCoreControllerCheckResponse503) & {
  headers: Headers;
};

export type healthCoreControllerCheckResponse = healthCoreControllerCheckResponseSuccess | healthCoreControllerCheckResponseError;

export const getHealthCoreControllerCheckUrl = () => {
  return `/health`;
};

/**
 * Check the health status of the application
 * @summary Health Check
 */
export const healthCoreControllerCheck = async (options?: Parameters<typeof customFetch>[1]): Promise<healthCoreControllerCheckResponse> => {
  return customFetch<healthCoreControllerCheckResponse>(getHealthCoreControllerCheckUrl(), {
    ...options,
    method: 'GET',
  });
};

export const getHealthCoreControllerCheckQueryKey = () => {
  return [`/health`] as const;
};

export const getHealthCoreControllerCheckQueryOptions = <
  TData = Awaited<ReturnType<typeof healthCoreControllerCheck>>,
  TError = TooManyRequests429 | HealthCoreControllerCheck503,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCoreControllerCheck>>, TError, TData>>;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getHealthCoreControllerCheckQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof healthCoreControllerCheck>>> = ({ signal }) =>
    healthCoreControllerCheck({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof healthCoreControllerCheck>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type HealthCoreControllerCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCoreControllerCheck>>>;
export type HealthCoreControllerCheckQueryError = TooManyRequests429 | HealthCoreControllerCheck503;

export function useHealthCoreControllerCheck<
  TData = Awaited<ReturnType<typeof healthCoreControllerCheck>>,
  TError = TooManyRequests429 | HealthCoreControllerCheck503,
>(
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCoreControllerCheck>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof healthCoreControllerCheck>>,
          TError,
          Awaited<ReturnType<typeof healthCoreControllerCheck>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useHealthCoreControllerCheck<
  TData = Awaited<ReturnType<typeof healthCoreControllerCheck>>,
  TError = TooManyRequests429 | HealthCoreControllerCheck503,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCoreControllerCheck>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof healthCoreControllerCheck>>,
          TError,
          Awaited<ReturnType<typeof healthCoreControllerCheck>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useHealthCoreControllerCheck<
  TData = Awaited<ReturnType<typeof healthCoreControllerCheck>>,
  TError = TooManyRequests429 | HealthCoreControllerCheck503,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCoreControllerCheck>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Health Check
 */

export function useHealthCoreControllerCheck<
  TData = Awaited<ReturnType<typeof healthCoreControllerCheck>>,
  TError = TooManyRequests429 | HealthCoreControllerCheck503,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCoreControllerCheck>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getHealthCoreControllerCheckQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}
