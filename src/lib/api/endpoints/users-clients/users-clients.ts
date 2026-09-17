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
  CreateClientRequest,
  Forbidden403,
  NotFound404,
  PatchClientRequest,
  TooManyRequests429,
  Unauthorized401,
  UserClient,
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

export type getClientResponse200 = {
  data: UserClient;
  status: 200;
};

export type getClientResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getClientResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type getClientResponse404 = {
  data: NotFound404;
  status: 404;
};

export type getClientResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getClientResponseSuccess = getClientResponse200 & {
  headers: Headers;
};
export type getClientResponseError = (getClientResponse401 | getClientResponse403 | getClientResponse404 | getClientResponse429) & {
  headers: Headers;
};

export type getClientResponse = getClientResponseSuccess | getClientResponseError;

export const getGetClientUrl = (identifier: string) => {
  return `/users/clients/${identifier}`;
};

/**
 * Retrieves client information for a specific client or current authenticated user
 * @summary Get Client Details
 */
export const getClient = async (identifier: string, options?: Parameters<typeof customFetch>[1]): Promise<getClientResponse> => {
  return customFetch<getClientResponse>(getGetClientUrl(identifier), {
    ...options,
    method: 'GET',
  });
};

export const getGetClientQueryKey = (identifier: string) => {
  return [`/users/clients/${identifier}`] as const;
};

export const getGetClientQueryOptions = <
  TData = Awaited<ReturnType<typeof getClient>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  identifier: string,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData>>; request?: SecondParameter<typeof customFetch> },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetClientQueryKey(identifier);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getClient>>> = ({ signal }) => getClient(identifier, { signal, ...requestOptions });

  return { queryKey, queryFn, enabled: identifier !== null && identifier !== undefined, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getClient>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetClientQueryResult = NonNullable<Awaited<ReturnType<typeof getClient>>>;
export type GetClientQueryError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429;

export function useGetClient<
  TData = Awaited<ReturnType<typeof getClient>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  identifier: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof getClient>>, TError, Awaited<ReturnType<typeof getClient>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetClient<
  TData = Awaited<ReturnType<typeof getClient>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  identifier: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof getClient>>, TError, Awaited<ReturnType<typeof getClient>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetClient<
  TData = Awaited<ReturnType<typeof getClient>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  identifier: string,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData>>; request?: SecondParameter<typeof customFetch> },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get Client Details
 */

export function useGetClient<
  TData = Awaited<ReturnType<typeof getClient>>,
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
>(
  identifier: string,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData>>; request?: SecondParameter<typeof customFetch> },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetClientQueryOptions(identifier, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type patchClientResponse200 = {
  data: UserClient;
  status: 200;
};

export type patchClientResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type patchClientResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type patchClientResponse409 = {
  data: Conflict409;
  status: 409;
};

export type patchClientResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type patchClientResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type patchClientResponseSuccess = patchClientResponse200 & {
  headers: Headers;
};
export type patchClientResponseError = (
  patchClientResponse401 | patchClientResponse403 | patchClientResponse409 | patchClientResponse422 | patchClientResponse429
) & {
  headers: Headers;
};

export type patchClientResponse = patchClientResponseSuccess | patchClientResponseError;

export const getPatchClientUrl = (identifier: string) => {
  return `/users/clients/${identifier}`;
};

/**
 * Partially updates client information
 * @summary Patch Client Information
 */
export const patchClient = async (
  identifier: string,
  patchClientRequest: PatchClientRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<patchClientResponse> => {
  return customFetch<patchClientResponse>(getPatchClientUrl(identifier), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(patchClientRequest),
  });
};

export const getPatchClientMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof patchClient>>, TError, { identifier: string; data: PatchClientRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof patchClient>>, TError, { identifier: string; data: PatchClientRequest }, TContext> => {
  const mutationKey = ['patchClient'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchClient>>, { identifier: string; data: PatchClientRequest }> = (props) => {
    const { identifier, data } = props ?? {};

    return patchClient(identifier, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchClientMutationResult = NonNullable<Awaited<ReturnType<typeof patchClient>>>;
export type PatchClientMutationBody = PatchClientRequest;
export type PatchClientMutationError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Patch Client Information
 */
export const usePatchClient = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof patchClient>>, TError, { identifier: string; data: PatchClientRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof patchClient>>, TError, { identifier: string; data: PatchClientRequest }, TContext> => {
  return useMutation(getPatchClientMutationOptions(options), queryClient);
};
export type createClientResponse200 = {
  data: UserClient;
  status: 200;
};

export type createClientResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type createClientResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type createClientResponse409 = {
  data: Conflict409;
  status: 409;
};

export type createClientResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type createClientResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type createClientResponseSuccess = createClientResponse200 & {
  headers: Headers;
};
export type createClientResponseError = (
  createClientResponse401 | createClientResponse403 | createClientResponse409 | createClientResponse422 | createClientResponse429
) & {
  headers: Headers;
};

export type createClientResponse = createClientResponseSuccess | createClientResponseError;

export const getCreateClientUrl = () => {
  return `/users/clients`;
};

/**
 * Creates a client profile for authenticated users that still do not have one
 * @summary Create Client Profile
 */
export const createClient = async (
  createClientRequest: CreateClientRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<createClientResponse> => {
  return customFetch<createClientResponse>(getCreateClientUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createClientRequest),
  });
};

export const getCreateClientMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof createClient>>, TError, { data: CreateClientRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof createClient>>, TError, { data: CreateClientRequest }, TContext> => {
  const mutationKey = ['createClient'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof createClient>>, { data: CreateClientRequest }> = (props) => {
    const { data } = props ?? {};

    return createClient(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateClientMutationResult = NonNullable<Awaited<ReturnType<typeof createClient>>>;
export type CreateClientMutationBody = CreateClientRequest;
export type CreateClientMutationError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Create Client Profile
 */
export const useCreateClient = <
  TError = Unauthorized401 | Forbidden403 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createClient>>, TError, { data: CreateClientRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof createClient>>, TError, { data: CreateClientRequest }, TContext> => {
  return useMutation(getCreateClientMutationOptions(options), queryClient);
};
