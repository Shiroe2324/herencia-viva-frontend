import { useMutation } from '@tanstack/react-query';
import type { MutationFunction, QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  Conflict409,
  Forbidden403,
  NotFound404,
  PasswordChangeRequest,
  PasswordResetConfirmation,
  PasswordResetRequest,
  SetPasswordRequest,
  TooManyRequests429,
  Unauthorized401,
  ValidationErrorResponse,
} from '../../models';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type forgotPasswordResponse204 = {
  data: void;
  status: 204;
};

export type forgotPasswordResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type forgotPasswordResponse404 = {
  data: NotFound404;
  status: 404;
};

export type forgotPasswordResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type forgotPasswordResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type forgotPasswordResponseSuccess = forgotPasswordResponse204 & {
  headers: Headers;
};
export type forgotPasswordResponseError = (
  forgotPasswordResponse403 | forgotPasswordResponse404 | forgotPasswordResponse422 | forgotPasswordResponse429
) & {
  headers: Headers;
};

export type forgotPasswordResponse = forgotPasswordResponseSuccess | forgotPasswordResponseError;

export const getForgotPasswordUrl = () => {
  return `/auth/forgot-password`;
};

/**
 * Sends a password reset link to the user email address to initiate password recovery
 * @summary Request Password Reset Link
 */
export const forgotPassword = async (
  passwordResetRequest: PasswordResetRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<forgotPasswordResponse> => {
  return customFetch<forgotPasswordResponse>(getForgotPasswordUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(passwordResetRequest),
  });
};

export const getForgotPasswordMutationOptions = <
  TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof forgotPassword>>, TError, { data: PasswordResetRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof forgotPassword>>, TError, { data: PasswordResetRequest }, TContext> => {
  const mutationKey = ['forgotPassword'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof forgotPassword>>, { data: PasswordResetRequest }> = (props) => {
    const { data } = props ?? {};

    return forgotPassword(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ForgotPasswordMutationResult = NonNullable<Awaited<ReturnType<typeof forgotPassword>>>;
export type ForgotPasswordMutationBody = PasswordResetRequest;
export type ForgotPasswordMutationError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Request Password Reset Link
 */
export const useForgotPassword = <TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof forgotPassword>>, TError, { data: PasswordResetRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof forgotPassword>>, TError, { data: PasswordResetRequest }, TContext> => {
  return useMutation(getForgotPasswordMutationOptions(options), queryClient);
};
export type resetPasswordResponse204 = {
  data: void;
  status: 204;
};

export type resetPasswordResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type resetPasswordResponse404 = {
  data: NotFound404;
  status: 404;
};

export type resetPasswordResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type resetPasswordResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type resetPasswordResponseSuccess = resetPasswordResponse204 & {
  headers: Headers;
};
export type resetPasswordResponseError = (
  resetPasswordResponse403 | resetPasswordResponse404 | resetPasswordResponse422 | resetPasswordResponse429
) & {
  headers: Headers;
};

export type resetPasswordResponse = resetPasswordResponseSuccess | resetPasswordResponseError;

export const getResetPasswordUrl = () => {
  return `/auth/reset-password`;
};

/**
 * Sets a new password using a valid reset token sent via email
 * @summary Confirm Password Reset
 */
export const resetPassword = async (
  passwordResetConfirmation: PasswordResetConfirmation,
  options?: Parameters<typeof customFetch>[1],
): Promise<resetPasswordResponse> => {
  return customFetch<resetPasswordResponse>(getResetPasswordUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(passwordResetConfirmation),
  });
};

export const getResetPasswordMutationOptions = <
  TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof resetPassword>>, TError, { data: PasswordResetConfirmation }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof resetPassword>>, TError, { data: PasswordResetConfirmation }, TContext> => {
  const mutationKey = ['resetPassword'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof resetPassword>>, { data: PasswordResetConfirmation }> = (props) => {
    const { data } = props ?? {};

    return resetPassword(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ResetPasswordMutationResult = NonNullable<Awaited<ReturnType<typeof resetPassword>>>;
export type ResetPasswordMutationBody = PasswordResetConfirmation;
export type ResetPasswordMutationError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Confirm Password Reset
 */
export const useResetPassword = <TError = Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof resetPassword>>, TError, { data: PasswordResetConfirmation }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof resetPassword>>, TError, { data: PasswordResetConfirmation }, TContext> => {
  return useMutation(getResetPasswordMutationOptions(options), queryClient);
};
export type updatePasswordResponse204 = {
  data: void;
  status: 204;
};

export type updatePasswordResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type updatePasswordResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type updatePasswordResponse409 = {
  data: Conflict409;
  status: 409;
};

export type updatePasswordResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type updatePasswordResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type updatePasswordResponseSuccess = updatePasswordResponse204 & {
  headers: Headers;
};
export type updatePasswordResponseError = (
  updatePasswordResponse401 | updatePasswordResponse403 | updatePasswordResponse409 | updatePasswordResponse422 | updatePasswordResponse429
) & {
  headers: Headers;
};

export type updatePasswordResponse = updatePasswordResponseSuccess | updatePasswordResponseError;

export const getUpdatePasswordUrl = () => {
  return `/auth/update-password`;
};

/**
 * Updates the password for an authenticated user with MFA support
 * @summary Change Account Password
 */
export const updatePassword = async (
  passwordChangeRequest: PasswordChangeRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<updatePasswordResponse> => {
  return customFetch<updatePasswordResponse>(getUpdatePasswordUrl(), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(passwordChangeRequest),
  });
};

export const getUpdatePasswordMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePassword>>, TError, { data: PasswordChangeRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof updatePassword>>, TError, { data: PasswordChangeRequest }, TContext> => {
  const mutationKey = ['updatePassword'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof updatePassword>>, { data: PasswordChangeRequest }> = (props) => {
    const { data } = props ?? {};

    return updatePassword(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdatePasswordMutationResult = NonNullable<Awaited<ReturnType<typeof updatePassword>>>;
export type UpdatePasswordMutationBody = PasswordChangeRequest;
export type UpdatePasswordMutationError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Change Account Password
 */
export const useUpdatePassword = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePassword>>, TError, { data: PasswordChangeRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof updatePassword>>, TError, { data: PasswordChangeRequest }, TContext> => {
  return useMutation(getUpdatePasswordMutationOptions(options), queryClient);
};
export type setPasswordResponse204 = {
  data: void;
  status: 204;
};

export type setPasswordResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type setPasswordResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type setPasswordResponse409 = {
  data: Conflict409;
  status: 409;
};

export type setPasswordResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type setPasswordResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type setPasswordResponseSuccess = setPasswordResponse204 & {
  headers: Headers;
};
export type setPasswordResponseError = (
  setPasswordResponse401 | setPasswordResponse403 | setPasswordResponse409 | setPasswordResponse422 | setPasswordResponse429
) & {
  headers: Headers;
};

export type setPasswordResponse = setPasswordResponseSuccess | setPasswordResponseError;

export const getSetPasswordUrl = () => {
  return `/auth/set-password`;
};

/**
 * Creates a password for OAuth users who registered without a password
 * @summary Set Initial Password
 */
export const setPassword = async (
  setPasswordRequest: SetPasswordRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<setPasswordResponse> => {
  return customFetch<setPasswordResponse>(getSetPasswordUrl(), {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(setPasswordRequest),
  });
};

export const getSetPasswordMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof setPassword>>, TError, { data: SetPasswordRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof setPassword>>, TError, { data: SetPasswordRequest }, TContext> => {
  const mutationKey = ['setPassword'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof setPassword>>, { data: SetPasswordRequest }> = (props) => {
    const { data } = props ?? {};

    return setPassword(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SetPasswordMutationResult = NonNullable<Awaited<ReturnType<typeof setPassword>>>;
export type SetPasswordMutationBody = SetPasswordRequest;
export type SetPasswordMutationError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Set Initial Password
 */
export const useSetPassword = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof setPassword>>, TError, { data: SetPasswordRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof setPassword>>, TError, { data: SetPasswordRequest }, TContext> => {
  return useMutation(getSetPasswordMutationOptions(options), queryClient);
};
