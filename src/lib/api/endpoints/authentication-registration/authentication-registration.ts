import { useMutation } from '@tanstack/react-query';
import type { MutationFunction, QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  Conflict409,
  EmailVerificationRequest,
  Forbidden403,
  NotFound404,
  ServiceUnavailable503,
  TooManyRequests429,
  UserRegistrationRequest,
  ValidationErrorResponse,
} from '../../models';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type registerUserResponse204 = {
  data: void;
  status: 204;
};

export type registerUserResponse409 = {
  data: Conflict409;
  status: 409;
};

export type registerUserResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type registerUserResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type registerUserResponse503 = {
  data: ServiceUnavailable503;
  status: 503;
};

export type registerUserResponseSuccess = registerUserResponse204 & {
  headers: Headers;
};
export type registerUserResponseError = (registerUserResponse409 | registerUserResponse422 | registerUserResponse429 | registerUserResponse503) & {
  headers: Headers;
};

export type registerUserResponse = registerUserResponseSuccess | registerUserResponseError;

export const getRegisterUserUrl = () => {
  return `/auth/register`;
};

/**
 * Registers a new user account with credentials and required client profile fields
 * @summary Create New User Account
 */
export const registerUser = async (
  userRegistrationRequest: UserRegistrationRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<registerUserResponse> => {
  return customFetch<registerUserResponse>(getRegisterUserUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(userRegistrationRequest),
  });
};

export const getRegisterUserMutationOptions = <
  TError = Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof registerUser>>, TError, { data: UserRegistrationRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof registerUser>>, TError, { data: UserRegistrationRequest }, TContext> => {
  const mutationKey = ['registerUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof registerUser>>, { data: UserRegistrationRequest }> = (props) => {
    const { data } = props ?? {};

    return registerUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RegisterUserMutationResult = NonNullable<Awaited<ReturnType<typeof registerUser>>>;
export type RegisterUserMutationBody = UserRegistrationRequest;
export type RegisterUserMutationError = Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503;

/**
 * @summary Create New User Account
 */
export const useRegisterUser = <TError = Conflict409 | ValidationErrorResponse | TooManyRequests429 | ServiceUnavailable503, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof registerUser>>, TError, { data: UserRegistrationRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof registerUser>>, TError, { data: UserRegistrationRequest }, TContext> => {
  return useMutation(getRegisterUserMutationOptions(options), queryClient);
};
export type verifyEmailResponse204 = {
  data: void;
  status: 204;
};

export type verifyEmailResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type verifyEmailResponse404 = {
  data: NotFound404;
  status: 404;
};

export type verifyEmailResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type verifyEmailResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type verifyEmailResponseSuccess = verifyEmailResponse204 & {
  headers: Headers;
};
export type verifyEmailResponseError = (verifyEmailResponse403 | verifyEmailResponse404 | verifyEmailResponse422 | verifyEmailResponse429) & {
  headers: Headers;
};

export type verifyEmailResponse = verifyEmailResponseSuccess | verifyEmailResponseError;

export const getVerifyEmailUrl = () => {
  return `/auth/verify-email`;
};

/**
 * Confirms user email ownership by verifying the token sent via email
 * @summary Verify Email Address
 */
export const verifyEmail = async (
  emailVerificationRequest: EmailVerificationRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<verifyEmailResponse> => {
  return customFetch<verifyEmailResponse>(getVerifyEmailUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(emailVerificationRequest),
  });
};

export const getVerifyEmailMutationOptions = <
  TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, { data: EmailVerificationRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, { data: EmailVerificationRequest }, TContext> => {
  const mutationKey = ['verifyEmail'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof verifyEmail>>, { data: EmailVerificationRequest }> = (props) => {
    const { data } = props ?? {};

    return verifyEmail(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type VerifyEmailMutationResult = NonNullable<Awaited<ReturnType<typeof verifyEmail>>>;
export type VerifyEmailMutationBody = EmailVerificationRequest;
export type VerifyEmailMutationError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Verify Email Address
 */
export const useVerifyEmail = <TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof verifyEmail>>, TError, { data: EmailVerificationRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof verifyEmail>>, TError, { data: EmailVerificationRequest }, TContext> => {
  return useMutation(getVerifyEmailMutationOptions(options), queryClient);
};
