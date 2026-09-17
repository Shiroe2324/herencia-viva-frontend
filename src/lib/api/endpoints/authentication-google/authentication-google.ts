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
  Forbidden403,
  GoogleAuthenticationResponse,
  GoogleExternalLoginRequest,
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

export type googleLoginResponse302 = {
  data: void;
  status: 302;
};

export type googleLoginResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type googleLoginResponseError = (googleLoginResponse302 | googleLoginResponse429) & {
  headers: Headers;
};

export type googleLoginResponse = googleLoginResponseError;

export const getGoogleLoginUrl = () => {
  return `/auth/google`;
};

/**
 * Redirects to Google authentication page to initiate OAuth2 sign-in flow
 * @summary Initiate Google OAuth2 Login
 */
export const googleLogin = async (options?: Parameters<typeof customFetch>[1]): Promise<googleLoginResponse> => {
  return customFetch<googleLoginResponse>(getGoogleLoginUrl(), {
    ...options,
    method: 'GET',
  });
};

export const getGoogleLoginQueryKey = () => {
  return [`/auth/google`] as const;
};

export const getGoogleLoginQueryOptions = <TData = Awaited<ReturnType<typeof googleLogin>>, TError = void | TooManyRequests429>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>>;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGoogleLoginQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof googleLogin>>> = ({ signal }) => googleLogin({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GoogleLoginQueryResult = NonNullable<Awaited<ReturnType<typeof googleLogin>>>;
export type GoogleLoginQueryError = void | TooManyRequests429;

export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = void | TooManyRequests429>(
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof googleLogin>>, TError, Awaited<ReturnType<typeof googleLogin>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = void | TooManyRequests429>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof googleLogin>>, TError, Awaited<ReturnType<typeof googleLogin>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = void | TooManyRequests429>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Initiate Google OAuth2 Login
 */

export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = void | TooManyRequests429>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGoogleLoginQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type googleLoginCallbackResponse302 = {
  data: void;
  status: 302;
};

export type googleLoginCallbackResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type googleLoginCallbackResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type googleLoginCallbackResponse409 = {
  data: Conflict409;
  status: 409;
};

export type googleLoginCallbackResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type googleLoginCallbackResponse503 = {
  data: ServiceUnavailable503;
  status: 503;
};

export type googleLoginCallbackResponseError = (
  | googleLoginCallbackResponse302
  | googleLoginCallbackResponse401
  | googleLoginCallbackResponse403
  | googleLoginCallbackResponse409
  | googleLoginCallbackResponse429
  | googleLoginCallbackResponse503
) & {
  headers: Headers;
};

export type googleLoginCallbackResponse = googleLoginCallbackResponseError;

export const getGoogleLoginCallbackUrl = () => {
  return `/auth/google/callback`;
};

/**
 * Handles the OAuth2 callback from Google after successful user authentication
 * @summary Google OAuth2 Callback Handler
 */
export const googleLoginCallback = async (options?: Parameters<typeof customFetch>[1]): Promise<googleLoginCallbackResponse> => {
  return customFetch<googleLoginCallbackResponse>(getGoogleLoginCallbackUrl(), {
    ...options,
    method: 'GET',
  });
};

export const getGoogleLoginCallbackQueryKey = () => {
  return [`/auth/google/callback`] as const;
};

export const getGoogleLoginCallbackQueryOptions = <
  TData = Awaited<ReturnType<typeof googleLoginCallback>>,
  TError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, TData>>;
  request?: SecondParameter<typeof customFetch>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGoogleLoginCallbackQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof googleLoginCallback>>> = ({ signal }) => googleLoginCallback({ signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GoogleLoginCallbackQueryResult = NonNullable<Awaited<ReturnType<typeof googleLoginCallback>>>;
export type GoogleLoginCallbackQueryError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503;

export function useGoogleLoginCallback<
  TData = Awaited<ReturnType<typeof googleLoginCallback>>,
  TError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503,
>(
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, Awaited<ReturnType<typeof googleLoginCallback>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGoogleLoginCallback<
  TData = Awaited<ReturnType<typeof googleLoginCallback>>,
  TError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, Awaited<ReturnType<typeof googleLoginCallback>>>,
        'initialData'
      >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGoogleLoginCallback<
  TData = Awaited<ReturnType<typeof googleLoginCallback>>,
  TError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Google OAuth2 Callback Handler
 */

export function useGoogleLoginCallback<
  TData = Awaited<ReturnType<typeof googleLoginCallback>>,
  TError = void | Unauthorized401 | Forbidden403 | Conflict409 | TooManyRequests429 | ServiceUnavailable503,
>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLoginCallback>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGoogleLoginCallbackQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type googleExternalLoginResponse200 = {
  data: GoogleAuthenticationResponse;
  status: 200;
};

export type googleExternalLoginResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type googleExternalLoginResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type googleExternalLoginResponse409 = {
  data: Conflict409;
  status: 409;
};

export type googleExternalLoginResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type googleExternalLoginResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type googleExternalLoginResponse503 = {
  data: ServiceUnavailable503;
  status: 503;
};

export type googleExternalLoginResponseSuccess = googleExternalLoginResponse200 & {
  headers: Headers;
};
export type googleExternalLoginResponseError = (
  | googleExternalLoginResponse401
  | googleExternalLoginResponse403
  | googleExternalLoginResponse409
  | googleExternalLoginResponse422
  | googleExternalLoginResponse429
  | googleExternalLoginResponse503
) & {
  headers: Headers;
};

export type googleExternalLoginResponse = googleExternalLoginResponseSuccess | googleExternalLoginResponseError;

export const getGoogleExternalLoginUrl = () => {
  return `/auth/google/external`;
};

/**
 * Authenticates or registers users via Google OAuth2 for mobile apps and external clients
 * @summary Google OAuth2 Mobile/External Login
 */
export const googleExternalLogin = async (
  googleExternalLoginRequest: GoogleExternalLoginRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<googleExternalLoginResponse> => {
  return customFetch<googleExternalLoginResponse>(getGoogleExternalLoginUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(googleExternalLoginRequest),
  });
};

export const getGoogleExternalLoginMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof googleExternalLogin>>, TError, { data: GoogleExternalLoginRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof googleExternalLogin>>, TError, { data: GoogleExternalLoginRequest }, TContext> => {
  const mutationKey = ['googleExternalLogin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof googleExternalLogin>>, { data: GoogleExternalLoginRequest }> = (props) => {
    const { data } = props ?? {};

    return googleExternalLogin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type GoogleExternalLoginMutationResult = NonNullable<Awaited<ReturnType<typeof googleExternalLogin>>>;
export type GoogleExternalLoginMutationBody = GoogleExternalLoginRequest;
export type GoogleExternalLoginMutationError =
  Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503;

/**
 * @summary Google OAuth2 Mobile/External Login
 */
export const useGoogleExternalLogin = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof googleExternalLogin>>, TError, { data: GoogleExternalLoginRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof googleExternalLogin>>, TError, { data: GoogleExternalLoginRequest }, TContext> => {
  return useMutation(getGoogleExternalLoginMutationOptions(options), queryClient);
};
