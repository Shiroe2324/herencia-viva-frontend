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
  AppleAuthenticationResponse,
  AppleExternalLoginRequest,
  Conflict409,
  Forbidden403,
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

export type appleLoginResponse302 = {
  data: void;
  status: 302;
};

export type appleLoginResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type appleLoginResponseError = (appleLoginResponse302 | appleLoginResponse429) & {
  headers: Headers;
};

export type appleLoginResponse = appleLoginResponseError;

export const getAppleLoginUrl = () => {
  return `/auth/apple`;
};

/**
 * Redirects to Apple authentication page to initiate OAuth2 sign-in flow
 * @summary Initiate Apple OAuth2 Login
 */
export const appleLogin = async (options?: Parameters<typeof customFetch>[1]): Promise<appleLoginResponse> => {
  return customFetch<appleLoginResponse>(getAppleLoginUrl(), {
    ...options,
    method: 'GET',
  });
};

export const getAppleLoginQueryKey = () => {
  return [`/auth/apple`] as const;
};

export const getAppleLoginQueryOptions = <TData = Awaited<ReturnType<typeof appleLogin>>, TError = void | TooManyRequests429>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof appleLogin>>, TError, TData>>;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAppleLoginQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof appleLogin>>> = ({ signal }) => appleLogin({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof appleLogin>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type AppleLoginQueryResult = NonNullable<Awaited<ReturnType<typeof appleLogin>>>;
export type AppleLoginQueryError = void | TooManyRequests429;

export function useAppleLogin<TData = Awaited<ReturnType<typeof appleLogin>>, TError = void | TooManyRequests429>(
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof appleLogin>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof appleLogin>>, TError, Awaited<ReturnType<typeof appleLogin>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useAppleLogin<TData = Awaited<ReturnType<typeof appleLogin>>, TError = void | TooManyRequests429>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof appleLogin>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof appleLogin>>, TError, Awaited<ReturnType<typeof appleLogin>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useAppleLogin<TData = Awaited<ReturnType<typeof appleLogin>>, TError = void | TooManyRequests429>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof appleLogin>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Initiate Apple OAuth2 Login
 */

export function useAppleLogin<TData = Awaited<ReturnType<typeof appleLogin>>, TError = void | TooManyRequests429>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof appleLogin>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getAppleLoginQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type appleLoginCallbackResponse302 = {
  data: void;
  status: 302;
};

export type appleLoginCallbackResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type appleLoginCallbackResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type appleLoginCallbackResponse409 = {
  data: Conflict409;
  status: 409;
};

export type appleLoginCallbackResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type appleLoginCallbackResponse503 = {
  data: ServiceUnavailable503;
  status: 503;
};

export type appleLoginCallbackResponseError = (
  | appleLoginCallbackResponse302
  | appleLoginCallbackResponse401
  | appleLoginCallbackResponse403
  | appleLoginCallbackResponse409
  | appleLoginCallbackResponse429
  | appleLoginCallbackResponse503
) & {
  headers: Headers;
};

export type appleLoginCallbackResponse = appleLoginCallbackResponseError;

export const getAppleLoginCallbackUrl = () => {
  return `/auth/apple/callback`;
};

/**
 * Handles the OAuth2 callback from Apple after successful user authentication
 * @summary Apple OAuth2 Callback Handler
 */
export const appleLoginCallback = async (options?: Parameters<typeof customFetch>[1]): Promise<appleLoginCallbackResponse> => {
  return customFetch<appleLoginCallbackResponse>(getAppleLoginCallbackUrl(), {
    ...options,
    method: 'POST',
  });
};

export const getAppleLoginCallbackMutationOptions = <
  TError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof appleLoginCallback>>, TError, void, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof appleLoginCallback>>, TError, void, TContext> => {
  const mutationKey = ['appleLoginCallback'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof appleLoginCallback>>, void> = () => {
    return appleLoginCallback(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AppleLoginCallbackMutationResult = NonNullable<Awaited<ReturnType<typeof appleLoginCallback>>>;

export type AppleLoginCallbackMutationError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503;

/**
 * @summary Apple OAuth2 Callback Handler
 */
export const useAppleLoginCallback = <
  TError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof appleLoginCallback>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof appleLoginCallback>>, TError, void, TContext> => {
  return useMutation(getAppleLoginCallbackMutationOptions(options), queryClient);
};
export type appleExternalLoginResponse200 = {
  data: AppleAuthenticationResponse;
  status: 200;
};

export type appleExternalLoginResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type appleExternalLoginResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type appleExternalLoginResponse409 = {
  data: Conflict409;
  status: 409;
};

export type appleExternalLoginResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type appleExternalLoginResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type appleExternalLoginResponse503 = {
  data: ServiceUnavailable503;
  status: 503;
};

export type appleExternalLoginResponseSuccess = appleExternalLoginResponse200 & {
  headers: Headers;
};
export type appleExternalLoginResponseError = (
  | appleExternalLoginResponse401
  | appleExternalLoginResponse403
  | appleExternalLoginResponse409
  | appleExternalLoginResponse422
  | appleExternalLoginResponse429
  | appleExternalLoginResponse503
) & {
  headers: Headers;
};

export type appleExternalLoginResponse = appleExternalLoginResponseSuccess | appleExternalLoginResponseError;

export const getAppleExternalLoginUrl = () => {
  return `/auth/apple/external`;
};

/**
 * Authenticates or registers users via Apple OAuth2 for mobile apps and external clients
 * @summary Apple OAuth2 Mobile/External Login
 */
export const appleExternalLogin = async (
  appleExternalLoginRequest: AppleExternalLoginRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<appleExternalLoginResponse> => {
  return customFetch<appleExternalLoginResponse>(getAppleExternalLoginUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(appleExternalLoginRequest),
  });
};

export const getAppleExternalLoginMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof appleExternalLogin>>, TError, { data: AppleExternalLoginRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof appleExternalLogin>>, TError, { data: AppleExternalLoginRequest }, TContext> => {
  const mutationKey = ['appleExternalLogin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof appleExternalLogin>>, { data: AppleExternalLoginRequest }> = (props) => {
    const { data } = props ?? {};

    return appleExternalLogin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AppleExternalLoginMutationResult = NonNullable<Awaited<ReturnType<typeof appleExternalLogin>>>;
export type AppleExternalLoginMutationBody = AppleExternalLoginRequest;
export type AppleExternalLoginMutationError =
  Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503;

/**
 * @summary Apple OAuth2 Mobile/External Login
 */
export const useAppleExternalLogin = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof appleExternalLogin>>, TError, { data: AppleExternalLoginRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof appleExternalLogin>>, TError, { data: AppleExternalLoginRequest }, TContext> => {
  return useMutation(getAppleExternalLoginMutationOptions(options), queryClient);
};
