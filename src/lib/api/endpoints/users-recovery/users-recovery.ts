import { useMutation } from '@tanstack/react-query';
import type { MutationFunction, QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  AccountRecoveryRequest,
  Conflict409,
  NotFound404,
  SendRecoveryEmailRequest,
  TooManyRequests429,
  Unauthorized401,
  ValidationErrorResponse,
} from '../../models';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type recoverAccountResponse204 = {
  data: void;
  status: 204;
};

export type recoverAccountResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type recoverAccountResponse404 = {
  data: NotFound404;
  status: 404;
};

export type recoverAccountResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type recoverAccountResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type recoverAccountResponseSuccess = recoverAccountResponse204 & {
  headers: Headers;
};
export type recoverAccountResponseError = (
  recoverAccountResponse401 | recoverAccountResponse404 | recoverAccountResponse422 | recoverAccountResponse429
) & {
  headers: Headers;
};

export type recoverAccountResponse = recoverAccountResponseSuccess | recoverAccountResponseError;

export const getRecoverAccountUrl = () => {
  return `/users/recover-account`;
};

/**
 * Restores a previously deleted user account using a recovery token
 * @summary Restore Deleted Account
 */
export const recoverAccount = async (
  accountRecoveryRequest: AccountRecoveryRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<recoverAccountResponse> => {
  return customFetch<recoverAccountResponse>(getRecoverAccountUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(accountRecoveryRequest),
  });
};

export const getRecoverAccountMutationOptions = <
  TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof recoverAccount>>, TError, { data: AccountRecoveryRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof recoverAccount>>, TError, { data: AccountRecoveryRequest }, TContext> => {
  const mutationKey = ['recoverAccount'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof recoverAccount>>, { data: AccountRecoveryRequest }> = (props) => {
    const { data } = props ?? {};

    return recoverAccount(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RecoverAccountMutationResult = NonNullable<Awaited<ReturnType<typeof recoverAccount>>>;
export type RecoverAccountMutationBody = AccountRecoveryRequest;
export type RecoverAccountMutationError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Restore Deleted Account
 */
export const useRecoverAccount = <TError = Unauthorized401 | NotFound404 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof recoverAccount>>, TError, { data: AccountRecoveryRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof recoverAccount>>, TError, { data: AccountRecoveryRequest }, TContext> => {
  return useMutation(getRecoverAccountMutationOptions(options), queryClient);
};
export type sendRecoveryEmailResponse204 = {
  data: void;
  status: 204;
};

export type sendRecoveryEmailResponse404 = {
  data: NotFound404;
  status: 404;
};

export type sendRecoveryEmailResponse409 = {
  data: Conflict409;
  status: 409;
};

export type sendRecoveryEmailResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type sendRecoveryEmailResponseSuccess = sendRecoveryEmailResponse204 & {
  headers: Headers;
};
export type sendRecoveryEmailResponseError = (sendRecoveryEmailResponse404 | sendRecoveryEmailResponse409 | sendRecoveryEmailResponse429) & {
  headers: Headers;
};

export type sendRecoveryEmailResponse = sendRecoveryEmailResponseSuccess | sendRecoveryEmailResponseError;

export const getSendRecoveryEmailUrl = () => {
  return `/users/recover-account/send-email`;
};

/**
 * Sends account recovery instructions to a deleted user account
 * @summary Send Account Recovery Email
 */
export const sendRecoveryEmail = async (
  sendRecoveryEmailRequest: SendRecoveryEmailRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<sendRecoveryEmailResponse> => {
  return customFetch<sendRecoveryEmailResponse>(getSendRecoveryEmailUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(sendRecoveryEmailRequest),
  });
};

export const getSendRecoveryEmailMutationOptions = <TError = NotFound404 | Conflict409 | TooManyRequests429, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendRecoveryEmail>>, TError, { data: SendRecoveryEmailRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof sendRecoveryEmail>>, TError, { data: SendRecoveryEmailRequest }, TContext> => {
  const mutationKey = ['sendRecoveryEmail'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof sendRecoveryEmail>>, { data: SendRecoveryEmailRequest }> = (props) => {
    const { data } = props ?? {};

    return sendRecoveryEmail(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SendRecoveryEmailMutationResult = NonNullable<Awaited<ReturnType<typeof sendRecoveryEmail>>>;
export type SendRecoveryEmailMutationBody = SendRecoveryEmailRequest;
export type SendRecoveryEmailMutationError = NotFound404 | Conflict409 | TooManyRequests429;

/**
 * @summary Send Account Recovery Email
 */
export const useSendRecoveryEmail = <TError = NotFound404 | Conflict409 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendRecoveryEmail>>, TError, { data: SendRecoveryEmailRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof sendRecoveryEmail>>, TError, { data: SendRecoveryEmailRequest }, TContext> => {
  return useMutation(getSendRecoveryEmailMutationOptions(options), queryClient);
};
