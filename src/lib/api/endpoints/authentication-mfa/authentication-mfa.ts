import { useMutation } from '@tanstack/react-query';
import type { MutationFunction, QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  Conflict409,
  DisableMFARequest,
  EnableMFARequest,
  Forbidden403,
  MFAEnabledResponse,
  MFALoginSuccessResponse,
  MFASecretResponse,
  MFAVerificationRequest,
  NewBackupCodesResponse,
  NotFound404,
  RegenerateBackupCodesRequest,
  TooManyRequests429,
  Unauthorized401,
  ValidationErrorResponse,
} from '../../models';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type generateMfaResponse200 = {
  data: MFASecretResponse;
  status: 200;
};

export type generateMfaResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type generateMfaResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type generateMfaResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type generateMfaResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type generateMfaResponseSuccess = generateMfaResponse200 & {
  headers: Headers;
};
export type generateMfaResponseError = (generateMfaResponse401 | generateMfaResponse403 | generateMfaResponse422 | generateMfaResponse429) & {
  headers: Headers;
};

export type generateMfaResponse = generateMfaResponseSuccess | generateMfaResponseError;

export const getGenerateMfaUrl = () => {
  return `/auth/mfa/generate`;
};

/**
 * Creates a temporary TOTP (Time-based One-Time Password) secret for Multi-Factor Authentication setup
 * @summary Generate MFA Secret
 */
export const generateMfa = async (options?: Parameters<typeof customFetch>[1]): Promise<generateMfaResponse> => {
  return customFetch<generateMfaResponse>(getGenerateMfaUrl(), {
    ...options,
    method: 'POST',
  });
};

export const getGenerateMfaMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateMfa>>, TError, void, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof generateMfa>>, TError, void, TContext> => {
  const mutationKey = ['generateMfa'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof generateMfa>>, void> = () => {
    return generateMfa(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type GenerateMfaMutationResult = NonNullable<Awaited<ReturnType<typeof generateMfa>>>;

export type GenerateMfaMutationError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Generate MFA Secret
 */
export const useGenerateMfa = <TError = Unauthorized401 | Forbidden403 | ValidationErrorResponse | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateMfa>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof generateMfa>>, TError, void, TContext> => {
  return useMutation(getGenerateMfaMutationOptions(options), queryClient);
};
export type enableMfaResponse200 = {
  data: MFAEnabledResponse;
  status: 200;
};

export type enableMfaResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type enableMfaResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type enableMfaResponse409 = {
  data: Conflict409;
  status: 409;
};

export type enableMfaResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type enableMfaResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type enableMfaResponseSuccess = enableMfaResponse200 & {
  headers: Headers;
};
export type enableMfaResponseError = (
  enableMfaResponse401 | enableMfaResponse403 | enableMfaResponse409 | enableMfaResponse422 | enableMfaResponse429
) & {
  headers: Headers;
};

export type enableMfaResponse = enableMfaResponseSuccess | enableMfaResponseError;

export const getEnableMfaUrl = () => {
  return `/auth/mfa/enable`;
};

/**
 * Activates MFA after verifying the TOTP token and credentials
 * @summary Enable Multi-Factor Authentication
 */
export const enableMfa = async (enableMFARequest: EnableMFARequest, options?: Parameters<typeof customFetch>[1]): Promise<enableMfaResponse> => {
  return customFetch<enableMfaResponse>(getEnableMfaUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(enableMFARequest),
  });
};

export const getEnableMfaMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof enableMfa>>, TError, { data: EnableMFARequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof enableMfa>>, TError, { data: EnableMFARequest }, TContext> => {
  const mutationKey = ['enableMfa'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof enableMfa>>, { data: EnableMFARequest }> = (props) => {
    const { data } = props ?? {};

    return enableMfa(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type EnableMfaMutationResult = NonNullable<Awaited<ReturnType<typeof enableMfa>>>;
export type EnableMfaMutationBody = EnableMFARequest;
export type EnableMfaMutationError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Enable Multi-Factor Authentication
 */
export const useEnableMfa = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof enableMfa>>, TError, { data: EnableMFARequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof enableMfa>>, TError, { data: EnableMFARequest }, TContext> => {
  return useMutation(getEnableMfaMutationOptions(options), queryClient);
};
export type disableMfaResponse204 = {
  data: void;
  status: 204;
};

export type disableMfaResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type disableMfaResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type disableMfaResponse409 = {
  data: Conflict409;
  status: 409;
};

export type disableMfaResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type disableMfaResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type disableMfaResponseSuccess = disableMfaResponse204 & {
  headers: Headers;
};
export type disableMfaResponseError = (
  disableMfaResponse401 | disableMfaResponse403 | disableMfaResponse409 | disableMfaResponse422 | disableMfaResponse429
) & {
  headers: Headers;
};

export type disableMfaResponse = disableMfaResponseSuccess | disableMfaResponseError;

export const getDisableMfaUrl = () => {
  return `/auth/mfa/disable`;
};

/**
 * Deactivates MFA for the user account after credential verification
 * @summary Disable Multi-Factor Authentication
 */
export const disableMfa = async (disableMFARequest: DisableMFARequest, options?: Parameters<typeof customFetch>[1]): Promise<disableMfaResponse> => {
  return customFetch<disableMfaResponse>(getDisableMfaUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(disableMFARequest),
  });
};

export const getDisableMfaMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof disableMfa>>, TError, { data: DisableMFARequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof disableMfa>>, TError, { data: DisableMFARequest }, TContext> => {
  const mutationKey = ['disableMfa'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof disableMfa>>, { data: DisableMFARequest }> = (props) => {
    const { data } = props ?? {};

    return disableMfa(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DisableMfaMutationResult = NonNullable<Awaited<ReturnType<typeof disableMfa>>>;
export type DisableMfaMutationBody = DisableMFARequest;
export type DisableMfaMutationError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Disable Multi-Factor Authentication
 */
export const useDisableMfa = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof disableMfa>>, TError, { data: DisableMFARequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof disableMfa>>, TError, { data: DisableMFARequest }, TContext> => {
  return useMutation(getDisableMfaMutationOptions(options), queryClient);
};
export type validateMfaLoginResponse200 = {
  data: MFALoginSuccessResponse;
  status: 200;
};

export type validateMfaLoginResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type validateMfaLoginResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type validateMfaLoginResponse404 = {
  data: NotFound404;
  status: 404;
};

export type validateMfaLoginResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type validateMfaLoginResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type validateMfaLoginResponseSuccess = validateMfaLoginResponse200 & {
  headers: Headers;
};
export type validateMfaLoginResponseError = (
  validateMfaLoginResponse401 | validateMfaLoginResponse403 | validateMfaLoginResponse404 | validateMfaLoginResponse422 | validateMfaLoginResponse429
) & {
  headers: Headers;
};

export type validateMfaLoginResponse = validateMfaLoginResponseSuccess | validateMfaLoginResponseError;

export const getValidateMfaLoginUrl = () => {
  return `/auth/mfa/validate-login`;
};

/**
 * Completes the login process by verifying the MFA token to establish authenticated session
 * @summary Verify MFA During Login
 */
export const validateMfaLogin = async (
  mFAVerificationRequest: MFAVerificationRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<validateMfaLoginResponse> => {
  return customFetch<validateMfaLoginResponse>(getValidateMfaLoginUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(mFAVerificationRequest),
  });
};

export const getValidateMfaLoginMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof validateMfaLogin>>, TError, { data: MFAVerificationRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof validateMfaLogin>>, TError, { data: MFAVerificationRequest }, TContext> => {
  const mutationKey = ['validateMfaLogin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof validateMfaLogin>>, { data: MFAVerificationRequest }> = (props) => {
    const { data } = props ?? {};

    return validateMfaLogin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ValidateMfaLoginMutationResult = NonNullable<Awaited<ReturnType<typeof validateMfaLogin>>>;
export type ValidateMfaLoginMutationBody = MFAVerificationRequest;
export type ValidateMfaLoginMutationError = Unauthorized401 | Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Verify MFA During Login
 */
export const useValidateMfaLogin = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof validateMfaLogin>>, TError, { data: MFAVerificationRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof validateMfaLogin>>, TError, { data: MFAVerificationRequest }, TContext> => {
  return useMutation(getValidateMfaLoginMutationOptions(options), queryClient);
};
export type regenerateMfaBackupCodesResponse200 = {
  data: NewBackupCodesResponse;
  status: 200;
};

export type regenerateMfaBackupCodesResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type regenerateMfaBackupCodesResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type regenerateMfaBackupCodesResponse409 = {
  data: Conflict409;
  status: 409;
};

export type regenerateMfaBackupCodesResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type regenerateMfaBackupCodesResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type regenerateMfaBackupCodesResponseSuccess = regenerateMfaBackupCodesResponse200 & {
  headers: Headers;
};
export type regenerateMfaBackupCodesResponseError = (
  | regenerateMfaBackupCodesResponse401
  | regenerateMfaBackupCodesResponse403
  | regenerateMfaBackupCodesResponse409
  | regenerateMfaBackupCodesResponse422
  | regenerateMfaBackupCodesResponse429
) & {
  headers: Headers;
};

export type regenerateMfaBackupCodesResponse = regenerateMfaBackupCodesResponseSuccess | regenerateMfaBackupCodesResponseError;

export const getRegenerateMfaBackupCodesUrl = () => {
  return `/auth/mfa/regenerate-codes`;
};

/**
 * Generates new backup codes and invalidates all previous backup codes
 * @summary Regenerate MFA Backup Codes
 */
export const regenerateMfaBackupCodes = async (
  regenerateBackupCodesRequest: RegenerateBackupCodesRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<regenerateMfaBackupCodesResponse> => {
  return customFetch<regenerateMfaBackupCodesResponse>(getRegenerateMfaBackupCodesUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(regenerateBackupCodesRequest),
  });
};

export const getRegenerateMfaBackupCodesMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof regenerateMfaBackupCodes>>, TError, { data: RegenerateBackupCodesRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof regenerateMfaBackupCodes>>, TError, { data: RegenerateBackupCodesRequest }, TContext> => {
  const mutationKey = ['regenerateMfaBackupCodes'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof regenerateMfaBackupCodes>>, { data: RegenerateBackupCodesRequest }> = (props) => {
    const { data } = props ?? {};

    return regenerateMfaBackupCodes(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RegenerateMfaBackupCodesMutationResult = NonNullable<Awaited<ReturnType<typeof regenerateMfaBackupCodes>>>;
export type RegenerateMfaBackupCodesMutationBody = RegenerateBackupCodesRequest;
export type RegenerateMfaBackupCodesMutationError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Regenerate MFA Backup Codes
 */
export const useRegenerateMfaBackupCodes = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof regenerateMfaBackupCodes>>, TError, { data: RegenerateBackupCodesRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof regenerateMfaBackupCodes>>, TError, { data: RegenerateBackupCodesRequest }, TContext> => {
  return useMutation(getRegenerateMfaBackupCodesMutationOptions(options), queryClient);
};
