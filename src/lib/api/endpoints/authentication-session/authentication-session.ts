import { useMutation } from '@tanstack/react-query';
import type { MutationFunction, QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  Forbidden403,
  LoginRequestBody,
  LogoutRequestBody,
  MFAChallengeResponse,
  NotFound404,
  SuccessfulLoginResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  TooManyRequests429,
  Unauthorized401,
  ValidationErrorResponse,
} from '../../models';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type loginResponse200 = {
  data: SuccessfulLoginResponse;
  status: 200;
};

export type loginResponse202 = {
  data: MFAChallengeResponse;
  status: 202;
};

export type loginResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type loginResponse404 = {
  data: NotFound404;
  status: 404;
};

export type loginResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type loginResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type loginResponseSuccess = (loginResponse200 | loginResponse202) & {
  headers: Headers;
};
export type loginResponseError = (loginResponse403 | loginResponse404 | loginResponse422 | loginResponse429) & {
  headers: Headers;
};

export type loginResponse = loginResponseSuccess | loginResponseError;

export const getLoginUrl = () => {
  return `/auth/login`;
};

/**
 * Authenticates a user with credentials and returns JWT tokens for session management
 * @summary User Login
 */
export const login = async (loginRequestBody: LoginRequestBody, options?: Parameters<typeof customFetch>[1]): Promise<loginResponse> => {
  return customFetch<loginResponse>(getLoginUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(loginRequestBody),
  });
};

export const getLoginMutationOptions = <
  TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, { data: LoginRequestBody }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, { data: LoginRequestBody }, TContext> => {
  const mutationKey = ['login'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof login>>, { data: LoginRequestBody }> = (props) => {
    const { data } = props ?? {};

    return login(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>;
export type LoginMutationBody = LoginRequestBody;
export type LoginMutationError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary User Login
 */
export const useLogin = <TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, { data: LoginRequestBody }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof login>>, TError, { data: LoginRequestBody }, TContext> => {
  return useMutation(getLoginMutationOptions(options), queryClient);
};
export type logoutResponse204 = {
  data: void;
  status: 204;
};

export type logoutResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type logoutResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type logoutResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type logoutResponseSuccess = logoutResponse204 & {
  headers: Headers;
};
export type logoutResponseError = (logoutResponse401 | logoutResponse422 | logoutResponse429) & {
  headers: Headers;
};

export type logoutResponse = logoutResponseSuccess | logoutResponseError;

export const getLogoutUrl = () => {
  return `/auth/logout`;
};

/**
 * Invalidates the refresh token and ends the authenticated session
 * @summary User Logout
 */
export const logout = async (logoutRequestBody: LogoutRequestBody, options?: Parameters<typeof customFetch>[1]): Promise<logoutResponse> => {
  return customFetch<logoutResponse>(getLogoutUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(logoutRequestBody),
  });
};

export const getLogoutMutationOptions = <TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, { data: LogoutRequestBody }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, { data: LogoutRequestBody }, TContext> => {
  const mutationKey = ['logout'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof logout>>, { data: LogoutRequestBody }> = (props) => {
    const { data } = props ?? {};

    return logout(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type LogoutMutationResult = NonNullable<Awaited<ReturnType<typeof logout>>>;
export type LogoutMutationBody = LogoutRequestBody;
export type LogoutMutationError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary User Logout
 */
export const useLogout = <TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, { data: LogoutRequestBody }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof logout>>, TError, { data: LogoutRequestBody }, TContext> => {
  return useMutation(getLogoutMutationOptions(options), queryClient);
};
export type refreshTokensResponse200 = {
  data: TokenRefreshResponse;
  status: 200;
};

export type refreshTokensResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type refreshTokensResponse404 = {
  data: NotFound404;
  status: 404;
};

export type refreshTokensResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type refreshTokensResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type refreshTokensResponseSuccess = refreshTokensResponse200 & {
  headers: Headers;
};
export type refreshTokensResponseError = (
  refreshTokensResponse403 | refreshTokensResponse404 | refreshTokensResponse422 | refreshTokensResponse429
) & {
  headers: Headers;
};

export type refreshTokensResponse = refreshTokensResponseSuccess | refreshTokensResponseError;

export const getRefreshTokensUrl = () => {
  return `/auth/refresh`;
};

/**
 * Generates new access and refresh tokens using a valid refresh token
 * @summary Refresh JWT Tokens
 */
export const refreshTokens = async (
  tokenRefreshRequest: TokenRefreshRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<refreshTokensResponse> => {
  return customFetch<refreshTokensResponse>(getRefreshTokensUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(tokenRefreshRequest),
  });
};

export const getRefreshTokensMutationOptions = <
  TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof refreshTokens>>, TError, { data: TokenRefreshRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof refreshTokens>>, TError, { data: TokenRefreshRequest }, TContext> => {
  const mutationKey = ['refreshTokens'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof refreshTokens>>, { data: TokenRefreshRequest }> = (props) => {
    const { data } = props ?? {};

    return refreshTokens(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RefreshTokensMutationResult = NonNullable<Awaited<ReturnType<typeof refreshTokens>>>;
export type RefreshTokensMutationBody = TokenRefreshRequest;
export type RefreshTokensMutationError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Refresh JWT Tokens
 */
export const useRefreshTokens = <TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof refreshTokens>>, TError, { data: TokenRefreshRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof refreshTokens>>, TError, { data: TokenRefreshRequest }, TContext> => {
  return useMutation(getRefreshTokensMutationOptions(options), queryClient);
};
