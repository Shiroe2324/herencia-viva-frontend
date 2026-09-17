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
  GetAllRecommendationChatsParams,
  NotFound404,
  PaginatedRecommendationChatListResponse,
  PatchRecommendationChatRequest,
  RecommendationChat,
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

export type getAllRecommendationChatsResponse200 = {
  data: PaginatedRecommendationChatListResponse;
  status: 200;
};

export type getAllRecommendationChatsResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getAllRecommendationChatsResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type getAllRecommendationChatsResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getAllRecommendationChatsResponseSuccess = getAllRecommendationChatsResponse200 & {
  headers: Headers;
};
export type getAllRecommendationChatsResponseError = (
  getAllRecommendationChatsResponse401 | getAllRecommendationChatsResponse422 | getAllRecommendationChatsResponse429
) & {
  headers: Headers;
};

export type getAllRecommendationChatsResponse = getAllRecommendationChatsResponseSuccess | getAllRecommendationChatsResponseError;

export const getGetAllRecommendationChatsUrl = (params?: GetAllRecommendationChatsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/recommendations/chats?${stringifiedParams}` : `/recommendations/chats`;
};

/**
 * Retrieves a paginated list of recommendation chats that belong to the authenticated user.
 * @summary List Recommendation Chats
 */
export const getAllRecommendationChats = async (
  params?: GetAllRecommendationChatsParams,
  options?: Parameters<typeof customFetch>[1],
): Promise<getAllRecommendationChatsResponse> => {
  return customFetch<getAllRecommendationChatsResponse>(getGetAllRecommendationChatsUrl(params), {
    ...options,
    method: 'GET',
  });
};

export const getGetAllRecommendationChatsQueryKey = (params?: GetAllRecommendationChatsParams) => {
  return [`/recommendations/chats`, ...(params ? [params] : [])] as const;
};

export const getGetAllRecommendationChatsQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllRecommendationChats>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationChatsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationChats>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllRecommendationChatsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllRecommendationChats>>> = ({ signal }) =>
    getAllRecommendationChats(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationChats>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GetAllRecommendationChatsQueryResult = NonNullable<Awaited<ReturnType<typeof getAllRecommendationChats>>>;
export type GetAllRecommendationChatsQueryError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429;

export function useGetAllRecommendationChats<
  TData = Awaited<ReturnType<typeof getAllRecommendationChats>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params: undefined | GetAllRecommendationChatsParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationChats>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllRecommendationChats>>,
          TError,
          Awaited<ReturnType<typeof getAllRecommendationChats>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllRecommendationChats<
  TData = Awaited<ReturnType<typeof getAllRecommendationChats>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationChatsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationChats>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllRecommendationChats>>,
          TError,
          Awaited<ReturnType<typeof getAllRecommendationChats>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllRecommendationChats<
  TData = Awaited<ReturnType<typeof getAllRecommendationChats>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationChatsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationChats>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary List Recommendation Chats
 */

export function useGetAllRecommendationChats<
  TData = Awaited<ReturnType<typeof getAllRecommendationChats>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllRecommendationChatsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllRecommendationChats>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetAllRecommendationChatsQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type getRecommendationChatResponse200 = {
  data: RecommendationChat;
  status: 200;
};

export type getRecommendationChatResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getRecommendationChatResponse404 = {
  data: NotFound404;
  status: 404;
};

export type getRecommendationChatResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getRecommendationChatResponseSuccess = getRecommendationChatResponse200 & {
  headers: Headers;
};
export type getRecommendationChatResponseError = (
  getRecommendationChatResponse401 | getRecommendationChatResponse404 | getRecommendationChatResponse429
) & {
  headers: Headers;
};

export type getRecommendationChatResponse = getRecommendationChatResponseSuccess | getRecommendationChatResponseError;

export const getGetRecommendationChatUrl = (chatId: string) => {
  return `/recommendations/chats/${chatId}`;
};

/**
 * Retrieves a single recommendation chat by identifier when it belongs to the authenticated user.
 * @summary Get Recommendation Chat
 */
export const getRecommendationChat = async (chatId: string, options?: Parameters<typeof customFetch>[1]): Promise<getRecommendationChatResponse> => {
  return customFetch<getRecommendationChatResponse>(getGetRecommendationChatUrl(chatId), {
    ...options,
    method: 'GET',
  });
};

export const getGetRecommendationChatQueryKey = (chatId: string) => {
  return [`/recommendations/chats/${chatId}`] as const;
};

export const getGetRecommendationChatQueryOptions = <
  TData = Awaited<ReturnType<typeof getRecommendationChat>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  chatId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationChat>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetRecommendationChatQueryKey(chatId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getRecommendationChat>>> = ({ signal }) =>
    getRecommendationChat(chatId, { signal, ...requestOptions });

  return { queryKey, queryFn, enabled: chatId !== null && chatId !== undefined, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getRecommendationChat>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetRecommendationChatQueryResult = NonNullable<Awaited<ReturnType<typeof getRecommendationChat>>>;
export type GetRecommendationChatQueryError = Unauthorized401 | NotFound404 | TooManyRequests429;

export function useGetRecommendationChat<
  TData = Awaited<ReturnType<typeof getRecommendationChat>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  chatId: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationChat>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof getRecommendationChat>>, TError, Awaited<ReturnType<typeof getRecommendationChat>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetRecommendationChat<
  TData = Awaited<ReturnType<typeof getRecommendationChat>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  chatId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationChat>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof getRecommendationChat>>, TError, Awaited<ReturnType<typeof getRecommendationChat>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetRecommendationChat<
  TData = Awaited<ReturnType<typeof getRecommendationChat>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  chatId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationChat>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get Recommendation Chat
 */

export function useGetRecommendationChat<
  TData = Awaited<ReturnType<typeof getRecommendationChat>>,
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
>(
  chatId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getRecommendationChat>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetRecommendationChatQueryOptions(chatId, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type patchRecommendationChatResponse200 = {
  data: RecommendationChat;
  status: 200;
};

export type patchRecommendationChatResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type patchRecommendationChatResponse404 = {
  data: NotFound404;
  status: 404;
};

export type patchRecommendationChatResponse409 = {
  data: Conflict409;
  status: 409;
};

export type patchRecommendationChatResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type patchRecommendationChatResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type patchRecommendationChatResponseSuccess = patchRecommendationChatResponse200 & {
  headers: Headers;
};
export type patchRecommendationChatResponseError = (
  | patchRecommendationChatResponse401
  | patchRecommendationChatResponse404
  | patchRecommendationChatResponse409
  | patchRecommendationChatResponse422
  | patchRecommendationChatResponse429
) & {
  headers: Headers;
};

export type patchRecommendationChatResponse = patchRecommendationChatResponseSuccess | patchRecommendationChatResponseError;

export const getPatchRecommendationChatUrl = (chatId: string) => {
  return `/recommendations/chats/${chatId}`;
};

/**
 * Updates editable fields of a recommendation chat owned by the authenticated user.
 * @summary Update Recommendation Chat
 */
export const patchRecommendationChat = async (
  chatId: string,
  patchRecommendationChatRequest: PatchRecommendationChatRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<patchRecommendationChatResponse> => {
  return customFetch<patchRecommendationChatResponse>(getPatchRecommendationChatUrl(chatId), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(patchRecommendationChatRequest),
  });
};

export const getPatchRecommendationChatMutationOptions = <
  TError = Unauthorized401 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchRecommendationChat>>,
    TError,
    { chatId: string; data: PatchRecommendationChatRequest },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchRecommendationChat>>,
  TError,
  { chatId: string; data: PatchRecommendationChatRequest },
  TContext
> => {
  const mutationKey = ['patchRecommendationChat'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchRecommendationChat>>,
    { chatId: string; data: PatchRecommendationChatRequest }
  > = (props) => {
    const { chatId, data } = props ?? {};

    return patchRecommendationChat(chatId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchRecommendationChatMutationResult = NonNullable<Awaited<ReturnType<typeof patchRecommendationChat>>>;
export type PatchRecommendationChatMutationBody = PatchRecommendationChatRequest;
export type PatchRecommendationChatMutationError = Unauthorized401 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Update Recommendation Chat
 */
export const usePatchRecommendationChat = <
  TError = Unauthorized401 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof patchRecommendationChat>>,
      TError,
      { chatId: string; data: PatchRecommendationChatRequest },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof patchRecommendationChat>>,
  TError,
  { chatId: string; data: PatchRecommendationChatRequest },
  TContext
> => {
  return useMutation(getPatchRecommendationChatMutationOptions(options), queryClient);
};
export type deleteRecommendationChatResponse200 = {
  data: RecommendationChat;
  status: 200;
};

export type deleteRecommendationChatResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type deleteRecommendationChatResponse404 = {
  data: NotFound404;
  status: 404;
};

export type deleteRecommendationChatResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type deleteRecommendationChatResponseSuccess = deleteRecommendationChatResponse200 & {
  headers: Headers;
};
export type deleteRecommendationChatResponseError = (
  deleteRecommendationChatResponse401 | deleteRecommendationChatResponse404 | deleteRecommendationChatResponse429
) & {
  headers: Headers;
};

export type deleteRecommendationChatResponse = deleteRecommendationChatResponseSuccess | deleteRecommendationChatResponseError;

export const getDeleteRecommendationChatUrl = (chatId: string) => {
  return `/recommendations/chats/${chatId}`;
};

/**
 * Soft deletes a recommendation chat that belongs to the authenticated user.
 * @summary Delete Recommendation Chat
 */
export const deleteRecommendationChat = async (
  chatId: string,
  options?: Parameters<typeof customFetch>[1],
): Promise<deleteRecommendationChatResponse> => {
  return customFetch<deleteRecommendationChatResponse>(getDeleteRecommendationChatUrl(chatId), {
    ...options,
    method: 'DELETE',
  });
};

export const getDeleteRecommendationChatMutationOptions = <
  TError = Unauthorized401 | NotFound404 | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteRecommendationChat>>, TError, { chatId: string }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof deleteRecommendationChat>>, TError, { chatId: string }, TContext> => {
  const mutationKey = ['deleteRecommendationChat'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteRecommendationChat>>, { chatId: string }> = (props) => {
    const { chatId } = props ?? {};

    return deleteRecommendationChat(chatId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteRecommendationChatMutationResult = NonNullable<Awaited<ReturnType<typeof deleteRecommendationChat>>>;

export type DeleteRecommendationChatMutationError = Unauthorized401 | NotFound404 | TooManyRequests429;

/**
 * @summary Delete Recommendation Chat
 */
export const useDeleteRecommendationChat = <TError = Unauthorized401 | NotFound404 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteRecommendationChat>>, TError, { chatId: string }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof deleteRecommendationChat>>, TError, { chatId: string }, TContext> => {
  return useMutation(getDeleteRecommendationChatMutationOptions(options), queryClient);
};
