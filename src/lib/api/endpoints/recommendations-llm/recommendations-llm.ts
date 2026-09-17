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
  AskRecommendationRequest,
  AskRecommendationResponse,
  ContentSseEvent,
  DoneSseEvent,
  ErrorSseEvent,
  MetadataSseEvent,
  NotFound404,
  RecommendationsLLMControllerAskChatStreamParams,
  ServiceUnavailable503,
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

export type askRecommendationResponse200 = {
  data: AskRecommendationResponse;
  status: 200;
};

export type askRecommendationResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type askRecommendationResponse404 = {
  data: NotFound404;
  status: 404;
};

export type askRecommendationResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type askRecommendationResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type askRecommendationResponse503 = {
  data: ServiceUnavailable503;
  status: 503;
};

export type askRecommendationResponseSuccess = askRecommendationResponse200 & {
  headers: Headers;
};
export type askRecommendationResponseError = (
  | askRecommendationResponse401
  | askRecommendationResponse404
  | askRecommendationResponse422
  | askRecommendationResponse429
  | askRecommendationResponse503
) & {
  headers: Headers;
};

export type askRecommendationResponse = askRecommendationResponseSuccess | askRecommendationResponseError;

export const getAskRecommendationUrl = () => {
  return `/recommendations/llm/ask`;
};

/**
 * Uses Gemini + Chroma retrieval to generate persistent chat responses for cattle farmers while storing the conversation history in the database.
 * @summary Generate Cattle Farming Recommendation
 */
export const askRecommendation = async (
  askRecommendationRequest: AskRecommendationRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<askRecommendationResponse> => {
  return customFetch<askRecommendationResponse>(getAskRecommendationUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(askRecommendationRequest),
  });
};

export const getAskRecommendationMutationOptions = <
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof askRecommendation>>, TError, { data: AskRecommendationRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof askRecommendation>>, TError, { data: AskRecommendationRequest }, TContext> => {
  const mutationKey = ['askRecommendation'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof askRecommendation>>, { data: AskRecommendationRequest }> = (props) => {
    const { data } = props ?? {};

    return askRecommendation(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AskRecommendationMutationResult = NonNullable<Awaited<ReturnType<typeof askRecommendation>>>;
export type AskRecommendationMutationBody = AskRecommendationRequest;
export type AskRecommendationMutationError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503;

/**
 * @summary Generate Cattle Farming Recommendation
 */
export const useAskRecommendation = <
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof askRecommendation>>, TError, { data: AskRecommendationRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof askRecommendation>>, TError, { data: AskRecommendationRequest }, TContext> => {
  return useMutation(getAskRecommendationMutationOptions(options), queryClient);
};
export type recommendationsLLMControllerAskChatStreamResponse200 = {
  data: MetadataSseEvent | ContentSseEvent | DoneSseEvent | ErrorSseEvent;
  status: 200;
};

export type recommendationsLLMControllerAskChatStreamResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type recommendationsLLMControllerAskChatStreamResponse404 = {
  data: NotFound404;
  status: 404;
};

export type recommendationsLLMControllerAskChatStreamResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type recommendationsLLMControllerAskChatStreamResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type recommendationsLLMControllerAskChatStreamResponse503 = {
  data: ServiceUnavailable503;
  status: 503;
};

export type recommendationsLLMControllerAskChatStreamResponseSuccess = recommendationsLLMControllerAskChatStreamResponse200 & {
  headers: Headers;
};
export type recommendationsLLMControllerAskChatStreamResponseError = (
  | recommendationsLLMControllerAskChatStreamResponse401
  | recommendationsLLMControllerAskChatStreamResponse404
  | recommendationsLLMControllerAskChatStreamResponse422
  | recommendationsLLMControllerAskChatStreamResponse429
  | recommendationsLLMControllerAskChatStreamResponse503
) & {
  headers: Headers;
};

export type recommendationsLLMControllerAskChatStreamResponse =
  recommendationsLLMControllerAskChatStreamResponseSuccess | recommendationsLLMControllerAskChatStreamResponseError;

export const getRecommendationsLLMControllerAskChatStreamUrl = (params: RecommendationsLLMControllerAskChatStreamParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/recommendations/llm/ask/stream?${stringifiedParams}` : `/recommendations/llm/ask/stream`;
};

/**
 * @summary Stream Cattle Farming Recommendation
 */
export const recommendationsLLMControllerAskChatStream = async (
  params: RecommendationsLLMControllerAskChatStreamParams,
  options?: Parameters<typeof customFetch>[1],
): Promise<recommendationsLLMControllerAskChatStreamResponse> => {
  return customFetch<recommendationsLLMControllerAskChatStreamResponse>(getRecommendationsLLMControllerAskChatStreamUrl(params), {
    ...options,
    method: 'GET',
  });
};

export const getRecommendationsLLMControllerAskChatStreamQueryKey = (params?: RecommendationsLLMControllerAskChatStreamParams) => {
  return [`/recommendations/llm/ask/stream`, ...(params ? [params] : [])] as const;
};

export const getRecommendationsLLMControllerAskChatStreamQueryOptions = <
  TData = Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
>(
  params: RecommendationsLLMControllerAskChatStreamParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getRecommendationsLLMControllerAskChatStreamQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>> = ({ signal }) =>
    recommendationsLLMControllerAskChatStream(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type RecommendationsLLMControllerAskChatStreamQueryResult = NonNullable<Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>>;
export type RecommendationsLLMControllerAskChatStreamQueryError =
  Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503;

export function useRecommendationsLLMControllerAskChatStream<
  TData = Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
>(
  params: RecommendationsLLMControllerAskChatStreamParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
          TError,
          Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useRecommendationsLLMControllerAskChatStream<
  TData = Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
>(
  params: RecommendationsLLMControllerAskChatStreamParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
          TError,
          Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>
        >,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useRecommendationsLLMControllerAskChatStream<
  TData = Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
>(
  params: RecommendationsLLMControllerAskChatStreamParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Stream Cattle Farming Recommendation
 */

export function useRecommendationsLLMControllerAskChatStream<
  TData = Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>,
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
>(
  params: RecommendationsLLMControllerAskChatStreamParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof recommendationsLLMControllerAskChatStream>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getRecommendationsLLMControllerAskChatStreamQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}
