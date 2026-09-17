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
  CurrentUserProfile,
  Forbidden403,
  GetAllUsersParams,
  NotFound404,
  PaginatedUserListResponse,
  PublicUserProfile,
  TooManyRequests429,
  Unauthorized401,
  UserPatchRequest,
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

export type getAllUsersResponse200 = {
  data: PaginatedUserListResponse;
  status: 200;
};

export type getAllUsersResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getAllUsersResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type getAllUsersResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getAllUsersResponseSuccess = getAllUsersResponse200 & {
  headers: Headers;
};
export type getAllUsersResponseError = (getAllUsersResponse401 | getAllUsersResponse422 | getAllUsersResponse429) & {
  headers: Headers;
};

export type getAllUsersResponse = getAllUsersResponseSuccess | getAllUsersResponseError;

export const getGetAllUsersUrl = (params?: GetAllUsersParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ['select'];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? 'null' : String(v));
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value));
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/users?${stringifiedParams}` : `/users`;
};

/**
 * Retrieves a paginated list of all user accounts in the system
 * @summary List All Users
 */
export const getAllUsers = async (params?: GetAllUsersParams, options?: Parameters<typeof customFetch>[1]): Promise<getAllUsersResponse> => {
  return customFetch<getAllUsersResponse>(getGetAllUsersUrl(params), {
    ...options,
    method: 'GET',
  });
};

export const getGetAllUsersQueryKey = (params?: GetAllUsersParams) => {
  return [`/users`, ...(params ? [params] : [])] as const;
};

export const getGetAllUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllUsers>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllUsersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllUsers>>> = ({ signal }) => getAllUsers(params, { signal, ...requestOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GetAllUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getAllUsers>>>;
export type GetAllUsersQueryError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429;

export function useGetAllUsers<
  TData = Awaited<ReturnType<typeof getAllUsers>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params: undefined | GetAllUsersParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, Awaited<ReturnType<typeof getAllUsers>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllUsers<
  TData = Awaited<ReturnType<typeof getAllUsers>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, Awaited<ReturnType<typeof getAllUsers>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetAllUsers<
  TData = Awaited<ReturnType<typeof getAllUsers>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary List All Users
 */

export function useGetAllUsers<
  TData = Awaited<ReturnType<typeof getAllUsers>>,
  TError = Unauthorized401 | ValidationErrorResponse | TooManyRequests429,
>(
  params?: GetAllUsersParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetAllUsersQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type getUserResponse200 = {
  data: PublicUserProfile | CurrentUserProfile;
  status: 200;
};

export type getUserResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type getUserResponse404 = {
  data: NotFound404;
  status: 404;
};

export type getUserResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type getUserResponseSuccess = getUserResponse200 & {
  headers: Headers;
};
export type getUserResponseError = (getUserResponse401 | getUserResponse404 | getUserResponse429) & {
  headers: Headers;
};

export type getUserResponse = getUserResponseSuccess | getUserResponseError;

export const getGetUserUrl = (identifier: string) => {
  return `/users/${identifier}`;
};

/**
 * Retrieves detailed information about a specific user or current user
 * @summary Get User Details
 */
export const getUser = async (identifier: string, options?: Parameters<typeof customFetch>[1]): Promise<getUserResponse> => {
  return customFetch<getUserResponse>(getGetUserUrl(identifier), {
    ...options,
    method: 'GET',
  });
};

export const getGetUserQueryKey = (identifier: string) => {
  return [`/users/${identifier}`] as const;
};

export const getGetUserQueryOptions = <TData = Awaited<ReturnType<typeof getUser>>, TError = Unauthorized401 | NotFound404 | TooManyRequests429>(
  identifier: string,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>; request?: SecondParameter<typeof customFetch> },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUserQueryKey(identifier);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUser>>> = ({ signal }) => getUser(identifier, { signal, ...requestOptions });

  return { queryKey, queryFn, enabled: identifier !== null && identifier !== undefined, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getUser>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetUserQueryResult = NonNullable<Awaited<ReturnType<typeof getUser>>>;
export type GetUserQueryError = Unauthorized401 | NotFound404 | TooManyRequests429;

export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = Unauthorized401 | NotFound404 | TooManyRequests429>(
  identifier: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof getUser>>, TError, Awaited<ReturnType<typeof getUser>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = Unauthorized401 | NotFound404 | TooManyRequests429>(
  identifier: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof getUser>>, TError, Awaited<ReturnType<typeof getUser>>>, 'initialData'>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = Unauthorized401 | NotFound404 | TooManyRequests429>(
  identifier: string,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>; request?: SecondParameter<typeof customFetch> },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get User Details
 */

export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = Unauthorized401 | NotFound404 | TooManyRequests429>(
  identifier: string,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>; request?: SecondParameter<typeof customFetch> },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetUserQueryOptions(identifier, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}

export type patchUserResponse200 = {
  data: PublicUserProfile | CurrentUserProfile;
  status: 200;
};

export type patchUserResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type patchUserResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type patchUserResponse404 = {
  data: NotFound404;
  status: 404;
};

export type patchUserResponse409 = {
  data: Conflict409;
  status: 409;
};

export type patchUserResponse422 = {
  data: ValidationErrorResponse;
  status: 422;
};

export type patchUserResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type patchUserResponseSuccess = patchUserResponse200 & {
  headers: Headers;
};
export type patchUserResponseError = (
  patchUserResponse401 | patchUserResponse403 | patchUserResponse404 | patchUserResponse409 | patchUserResponse422 | patchUserResponse429
) & {
  headers: Headers;
};

export type patchUserResponse = patchUserResponseSuccess | patchUserResponseError;

export const getPatchUserUrl = (identifier: string) => {
  return `/users/${identifier}`;
};

/**
 * Modifies user profile information (username and display name)
 * @summary Patch User Profile
 */
export const patchUser = async (
  identifier: string,
  userPatchRequest: UserPatchRequest,
  options?: Parameters<typeof customFetch>[1],
): Promise<patchUserResponse> => {
  return customFetch<patchUserResponse>(getPatchUserUrl(identifier), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(userPatchRequest),
  });
};

export const getPatchUserMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof patchUser>>, TError, { identifier: string; data: UserPatchRequest }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof patchUser>>, TError, { identifier: string; data: UserPatchRequest }, TContext> => {
  const mutationKey = ['patchUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchUser>>, { identifier: string; data: UserPatchRequest }> = (props) => {
    const { identifier, data } = props ?? {};

    return patchUser(identifier, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchUserMutationResult = NonNullable<Awaited<ReturnType<typeof patchUser>>>;
export type PatchUserMutationBody = UserPatchRequest;
export type PatchUserMutationError = Unauthorized401 | Forbidden403 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429;

/**
 * @summary Patch User Profile
 */
export const usePatchUser = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | Conflict409 | ValidationErrorResponse | TooManyRequests429,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof patchUser>>, TError, { identifier: string; data: UserPatchRequest }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof patchUser>>, TError, { identifier: string; data: UserPatchRequest }, TContext> => {
  return useMutation(getPatchUserMutationOptions(options), queryClient);
};
export type deleteUserResponse200 = {
  data: PublicUserProfile | CurrentUserProfile;
  status: 200;
};

export type deleteUserResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type deleteUserResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type deleteUserResponse404 = {
  data: NotFound404;
  status: 404;
};

export type deleteUserResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type deleteUserResponseSuccess = deleteUserResponse200 & {
  headers: Headers;
};
export type deleteUserResponseError = (deleteUserResponse401 | deleteUserResponse403 | deleteUserResponse404 | deleteUserResponse429) & {
  headers: Headers;
};

export type deleteUserResponse = deleteUserResponseSuccess | deleteUserResponseError;

export const getDeleteUserUrl = (identifier: string) => {
  return `/users/${identifier}`;
};

/**
 * Soft deletes a user account (marks it as deleted without removing it from the database)
 * @summary Delete User Account
 */
export const deleteUser = async (identifier: string, options?: Parameters<typeof customFetch>[1]): Promise<deleteUserResponse> => {
  return customFetch<deleteUserResponse>(getDeleteUserUrl(identifier), {
    ...options,
    method: 'DELETE',
  });
};

export const getDeleteUserMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError, { identifier: string }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError, { identifier: string }, TContext> => {
  const mutationKey = ['deleteUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteUser>>, { identifier: string }> = (props) => {
    const { identifier } = props ?? {};

    return deleteUser(identifier, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteUserMutationResult = NonNullable<Awaited<ReturnType<typeof deleteUser>>>;

export type DeleteUserMutationError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429;

/**
 * @summary Delete User Account
 */
export const useDeleteUser = <TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError, { identifier: string }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof deleteUser>>, TError, { identifier: string }, TContext> => {
  return useMutation(getDeleteUserMutationOptions(options), queryClient);
};
