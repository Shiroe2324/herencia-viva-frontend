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
  Conflict409,
  CreateRecommendationContextRequest,
  Forbidden403,
  GetAllRecommendationContextsParams,
  NotFound404,
  PaginatedRecommendationContextListResponse,
  RecommendationContext,
  TooManyRequests429,
  Unauthorized401,
  UpdateRecommendationContextRequest,
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

export type getAllRecommendationContextsResponse200 = {
  data: PaginatedRecommendationContextListResponse;
  status: 200;
};

export type getAllRecommendationContextsResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getAllRecommendationContextsResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type getAllRecommendationContextsResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type getAllRecommendationContextsResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getAllRecommendationContextsResponseSuccess = getAllRecommendationContextsResponse200 & {
  headers: Headers;
};
export type getAllRecommendationContextsResponseError = (
  | getAllRecommendationContextsResponse401
  | getAllRecommendationContextsResponse403
  | getAllRecommendationContextsResponse422
  | getAllRecommendationContextsResponse429
) & {
  headers: Headers;
};

export type getAllRecommendationContextsResponse = getAllRecommendationContextsResponseSuccess | getAllRecommendationContextsResponseError;

export const getGetAllRecommendationContextsUrl = (params?: GetAllRecommendationContextsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/recommendations/contexts?${stringifiedParams}` : `/recommendations/contexts`;
};

/**
 * Retrieves a paginated list of recommendation contexts managed by administrators.
 * @summary List Recommendation Contexts
 */
export const getAllRecommendationContexts = async (
  params?: GetAllRecommendationContextsParams,
  options?: Parameters<typeof customFetch>[1],
): Promise<getAllRecommendationContextsResponse> => {
  return customFetch<getAllRecommendationContextsResponse>(getGetAllRecommendationContextsUrl(params), {
    ...options,
    method: 'GET',
  });
};

export const getGetAllRecommendationContextsQueryKey = (params?: GetAllRecommendationContextsParams) => {
  return [`/recommendations/contexts`, ...(params ? [params] : [])] as const;
};

export const getGetAllRecommendationContextsQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllRecommendationContexts>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationContextsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationContexts>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllRecommendationContextsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllRecommendationContexts>>> = ({ signal }) =>
    getAllRecommendationContexts(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationContexts>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GetAllRecommendationContextsQueryResult = NonNullable<Awaited<ReturnType<typeof getAllRecommendationContexts>>>;
export type GetAllRecommendationContextsQueryError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429;

export function useGetAllRecommendationContexts<
  TData = Awaited<ReturnType<typeof getAllRecommendationContexts>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params: undefined | GetAllRecommendationContextsParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationContexts>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllRecommendationContexts>>,
          TError,
          Awaited<ReturnType<typeof getAllRecommendationContexts>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllRecommendationContexts<
  TData = Awaited<ReturnType<typeof getAllRecommendationContexts>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationContextsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationContexts>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllRecommendationContexts>>,
          TError,
          Awaited<ReturnType<typeof getAllRecommendationContexts>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllRecommendationContexts<
  TData = Awaited<ReturnType<typeof getAllRecommendationContexts>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationContextsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationContexts>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary List Recommendation Contexts
 */

export function useGetAllRecommendationContexts<
  TData = Awaited<ReturnType<typeof getAllRecommendationContexts>>,
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationContextsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationContexts>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetAllRecommendationContextsQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type createRecommendationContextResponse201 = {
  data: RecommendationContext;
  status: 201;
};

export type createRecommendationContextResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type createRecommendationContextResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type createRecommendationContextResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type createRecommendationContextResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type createRecommendationContextResponseSuccess = createRecommendationContextResponse201 & {
  headers: Headers;
};
export type createRecommendationContextResponseError = (
  | createRecommendationContextResponse401
  | createRecommendationContextResponse403
  | createRecommendationContextResponse422
  | createRecommendationContextResponse429
) & {
  headers: Headers;
};

export type createRecommendationContextResponse = createRecommendationContextResponseSuccess | createRecommendationContextResponseError;

export const getCreateRecommendationContextUrl = () => {
  return `/recommendations/contexts`;
};

/**
 * Creates a recommendation context and synchronizes it into the vector database.
 * @summary Create Recommendation Context
 */
export const createRecommendationContext = async (
  createRecommendationContextRequest: CreateRecommendationContextRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<createRecommendationContextResponse> => {
  return customFetch<createRecommendationContextResponse>(getCreateRecommendationContextUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createRecommendationContextRequest),
  });
};

export const getCreateRecommendationContextMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createRecommendationContext>>,
    TError,
    { data: CreateRecommendationContextRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof createRecommendationContext>>, TError, { data: CreateRecommendationContextRequest }, TContext> => {
  const mutationKey = ['createRecommendationContext'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof createRecommendationContext>>, { data: CreateRecommendationContextRequest }> = (
    props,
  ) => {
    const { data } = props ?? {};

    return createRecommendationContext(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateRecommendationContextMutationResult = NonNullable<Awaited<ReturnType<typeof createRecommendationContext>>>;
export type CreateRecommendationContextMutationBody = CreateRecommendationContextRequest;
export type CreateRecommendationContextMutationError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Create Recommendation Context
 */
export const useCreateRecommendationContext = <
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createRecommendationContext>>,
      TError,
      { data: CreateRecommendationContextRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof createRecommendationContext>>, TError, { data: CreateRecommendationContextRequest }, TContext> => {
  return useMutation(getCreateRecommendationContextMutationOptions(options), queryClient);
};
export type getRecommendationContextResponse200 = {
  data: RecommendationContext;
  status: 200;
};

export type getRecommendationContextResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getRecommendationContextResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type getRecommendationContextResponse404 = {
  data: NotFound404;
  status: 404;
};

export type getRecommendationContextResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getRecommendationContextResponseSuccess = getRecommendationContextResponse200 & {
  headers: Headers;
};
export type getRecommendationContextResponseError = (
  | getRecommendationContextResponse401
  | getRecommendationContextResponse403
  | getRecommendationContextResponse404
  | getRecommendationContextResponse429
) & {
  headers: Headers;
};

export type getRecommendationContextResponse = getRecommendationContextResponseSuccess | getRecommendationContextResponseError;

export const getGetRecommendationContextUrl = (contextId: string) => {
  return `/recommendations/contexts/${contextId}`;
};

/**
 * Retrieves a single recommendation context by identifier.
 * @summary Get Recommendation Context
 */
export const getRecommendationContext = async (
  contextId: string,
  options?: Parameters<typeof customFetch>[1],
): Promise<getRecommendationContextResponse> => {
  return customFetch<getRecommendationContextResponse>(getGetRecommendationContextUrl(contextId), {
    ...options,
    method: 'GET',
  });
};

export const getGetRecommendationContextQueryKey = (contextId: string) => {
  return [`/recommendations/contexts/${contextId}`] as const;
};

export const getGetRecommendationContextQueryOptions = <
  TData = Awaited<ReturnType<typeof getRecommendationContext>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  contextId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationContext>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetRecommendationContextQueryKey(contextId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getRecommendationContext>>> = ({ signal }) =>
    getRecommendationContext(contextId, { signal, ...requestOptions });

  return { queryKey, queryFn, enabled: contextId !== null && contextId !== undefined, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getRecommendationContext>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetRecommendationContextQueryResult = NonNullable<Awaited<ReturnType<typeof getRecommendationContext>>>;
export type GetRecommendationContextQueryError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429;

export function useGetRecommendationContext<
  TData = Awaited<ReturnType<typeof getRecommendationContext>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  contextId: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationContext>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof getRecommendationContext>>, TError, Awaited<ReturnType<typeof getRecommendationContext>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetRecommendationContext<
  TData = Awaited<ReturnType<typeof getRecommendationContext>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  contextId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationContext>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getRecommendationContext>>,
          TError,
          Awaited<ReturnType<typeof getRecommendationContext>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetRecommendationContext<
  TData = Awaited<ReturnType<typeof getRecommendationContext>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  contextId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationContext>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get Recommendation Context
 */

export function useGetRecommendationContext<
  TData = Awaited<ReturnType<typeof getRecommendationContext>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  contextId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationContext>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetRecommendationContextQueryOptions(contextId, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type patchRecommendationContextResponse200 = {
  data: RecommendationContext;
  status: 200;
};

export type patchRecommendationContextResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type patchRecommendationContextResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type patchRecommendationContextResponse404 = {
  data: NotFound404;
  status: 404;
};

export type patchRecommendationContextResponse409 = {
  data: Conflict409;
  status: 409;
};

export type patchRecommendationContextResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type patchRecommendationContextResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type patchRecommendationContextResponseSuccess = patchRecommendationContextResponse200 & {
  headers: Headers;
};
export type patchRecommendationContextResponseError = (
  | patchRecommendationContextResponse401
  | patchRecommendationContextResponse403
  | patchRecommendationContextResponse404
  | patchRecommendationContextResponse409
  | patchRecommendationContextResponse422
  | patchRecommendationContextResponse429
) & {
  headers: Headers;
};

export type patchRecommendationContextResponse = patchRecommendationContextResponseSuccess | patchRecommendationContextResponseError;

export const getPatchRecommendationContextUrl = (contextId: string) => {
  return `/recommendations/contexts/${contextId}`;
};

/**
 * Updates an existing recommendation context and re-synchronizes it in the vector database.
 * @summary Update Recommendation Context
 */
export const patchRecommendationContext = async (
  contextId: string,
  updateRecommendationContextRequest: UpdateRecommendationContextRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<patchRecommendationContextResponse> => {
  return customFetch<patchRecommendationContextResponse>(getPatchRecommendationContextUrl(contextId), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateRecommendationContextRequest),
  });
};

export const getPatchRecommendationContextMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchRecommendationContext>>,
    TError,
    { contextId: string; data: UpdateRecommendationContextRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchRecommendationContext>>,
  TError,
  { contextId: string; data: UpdateRecommendationContextRequest },
  TContext
> => {
  const mutationKey = ['patchRecommendationContext'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchRecommendationContext>>,
    { contextId: string; data: UpdateRecommendationContextRequest }
  > = (props) => {
    const { contextId, data } = props ?? {};

    return patchRecommendationContext(contextId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchRecommendationContextMutationResult = NonNullable<Awaited<ReturnType<typeof patchRecommendationContext>>>;
export type PatchRecommendationContextMutationBody = UpdateRecommendationContextRequest;
export type PatchRecommendationContextMutationError =
  Unauthorized401 | Forbidden403 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Update Recommendation Context
 */
export const usePatchRecommendationContext = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof patchRecommendationContext>>,
      TError,
      { contextId: string; data: UpdateRecommendationContextRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof patchRecommendationContext>>,
  TError,
  { contextId: string; data: UpdateRecommendationContextRequest },
  TContext
> => {
  return useMutation(getPatchRecommendationContextMutationOptions(options), queryClient);
};
export type deleteRecommendationContextResponse200 = {
  data: RecommendationContext;
  status: 200;
};

export type deleteRecommendationContextResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type deleteRecommendationContextResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type deleteRecommendationContextResponse404 = {
  data: NotFound404;
  status: 404;
};

export type deleteRecommendationContextResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type deleteRecommendationContextResponseSuccess = deleteRecommendationContextResponse200 & {
  headers: Headers;
};
export type deleteRecommendationContextResponseError = (
  | deleteRecommendationContextResponse401
  | deleteRecommendationContextResponse403
  | deleteRecommendationContextResponse404
  | deleteRecommendationContextResponse429
) & {
  headers: Headers;
};

export type deleteRecommendationContextResponse = deleteRecommendationContextResponseSuccess | deleteRecommendationContextResponseError;

export const getDeleteRecommendationContextUrl = (contextId: string) => {
  return `/recommendations/contexts/${contextId}`;
};

/**
 * Soft deletes a recommendation context and removes its mirrored record from the vector database.
 * @summary Delete Recommendation Context
 */
export const deleteRecommendationContext = async (
  contextId: string,
  options?: Parameters<typeof customFetch>[1],
): Promise<deleteRecommendationContextResponse> => {
  return customFetch<deleteRecommendationContextResponse>(getDeleteRecommendationContextUrl(contextId), {
    ...options,
    method: 'DELETE',
  });
};

export const getDeleteRecommendationContextMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteRecommendationContext>>, TError, { contextId: string }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof deleteRecommendationContext>>, TError, { contextId: string }, TContext> => {
  const mutationKey = ['deleteRecommendationContext'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteRecommendationContext>>, { contextId: string }> = (props) => {
    const { contextId } = props ?? {};

    return deleteRecommendationContext(contextId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteRecommendationContextMutationResult = NonNullable<Awaited<ReturnType<typeof deleteRecommendationContext>>>;

export type DeleteRecommendationContextMutationError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429;

/**
 * @summary Delete Recommendation Context
 */
export const useDeleteRecommendationContext = <TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteRecommendationContext>>, TError, { contextId: string }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof deleteRecommendationContext>>, TError, { contextId: string }, TContext> => {
  return useMutation(getDeleteRecommendationContextMutationOptions(options), queryClient);
};
