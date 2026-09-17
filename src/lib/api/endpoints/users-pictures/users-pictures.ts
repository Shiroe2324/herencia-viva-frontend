import { useMutation } from '@tanstack/react-query';
import type { MutationFunction, QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { customFetch } from '../../custom-fetch';
import type {
  BadRequest400,
  Forbidden403,
  NotFound404,
  PictureDeletionResponse,
  PictureUpdateResponse,
  ProfilePictureUpdate,
  TooManyRequests429,
  Unauthorized401,
} from '../../models';

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type updateUserPictureResponse202 = {
  data: PictureUpdateResponse;
  status: 202;
};

export type updateUserPictureResponse204 = {
  data: void;
  status: 204;
};

export type updateUserPictureResponse400 = {
  data: BadRequest400;
  status: 400;
};

export type updateUserPictureResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type updateUserPictureResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type updateUserPictureResponse404 = {
  data: NotFound404;
  status: 404;
};

export type updateUserPictureResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type updateUserPictureResponseSuccess = (updateUserPictureResponse202 | updateUserPictureResponse204) & {
  headers: Headers;
};
export type updateUserPictureResponseError = (
  | updateUserPictureResponse400
  | updateUserPictureResponse401
  | updateUserPictureResponse403
  | updateUserPictureResponse404
  | updateUserPictureResponse429
) & {
  headers: Headers;
};

export type updateUserPictureResponse = updateUserPictureResponseSuccess | updateUserPictureResponseError;

export const getUpdateUserPictureUrl = (identifier: string) => {
  return `/users/${identifier}/picture`;
};

/**
 * Uploads or updates the user profile picture
 * @summary Upload Profile Picture
 */
export const updateUserPicture = async (
  identifier: string,
  profilePictureUpdate: ProfilePictureUpdate,
  options?: Parameters<typeof customFetch>[1],
): Promise<updateUserPictureResponse> => {
  const formData = new FormData();
  formData.append(`picture`, profilePictureUpdate.picture);

  return customFetch<updateUserPictureResponse>(getUpdateUserPictureUrl(identifier), {
    ...options,
    method: 'PATCH',
    body: formData,
  });
};

export const getUpdateUserPictureMutationOptions = <
  TError = BadRequest400 | Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateUserPicture>>, TError, { identifier: string; data: ProfilePictureUpdate }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof updateUserPicture>>, TError, { identifier: string; data: ProfilePictureUpdate }, TContext> => {
  const mutationKey = ['updateUserPicture'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateUserPicture>>, { identifier: string; data: ProfilePictureUpdate }> = (props) => {
    const { identifier, data } = props ?? {};

    return updateUserPicture(identifier, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateUserPictureMutationResult = NonNullable<Awaited<ReturnType<typeof updateUserPicture>>>;
export type UpdateUserPictureMutationBody = ProfilePictureUpdate;
export type UpdateUserPictureMutationError = BadRequest400 | Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429;

/**
 * @summary Upload Profile Picture
 */
export const useUpdateUserPicture = <TError = BadRequest400 | Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof updateUserPicture>>,
      TError,
      { identifier: string; data: ProfilePictureUpdate },
      TContext
    >;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof updateUserPicture>>, TError, { identifier: string; data: ProfilePictureUpdate }, TContext> => {
  return useMutation(getUpdateUserPictureMutationOptions(options), queryClient);
};
export type deleteUserPictureResponse202 = {
  data: PictureDeletionResponse;
  status: 202;
};

export type deleteUserPictureResponse204 = {
  data: void;
  status: 204;
};

export type deleteUserPictureResponse401 = {
  data: Unauthorized401;
  status: 401;
};

export type deleteUserPictureResponse403 = {
  data: Forbidden403;
  status: 403;
};

export type deleteUserPictureResponse404 = {
  data: NotFound404;
  status: 404;
};

export type deleteUserPictureResponse429 = {
  data: TooManyRequests429;
  status: 429;
};

export type deleteUserPictureResponseSuccess = (deleteUserPictureResponse202 | deleteUserPictureResponse204) & {
  headers: Headers;
};
export type deleteUserPictureResponseError = (
  deleteUserPictureResponse401 | deleteUserPictureResponse403 | deleteUserPictureResponse404 | deleteUserPictureResponse429
) & {
  headers: Headers;
};

export type deleteUserPictureResponse = deleteUserPictureResponseSuccess | deleteUserPictureResponseError;

export const getDeleteUserPictureUrl = (identifier: string) => {
  return `/users/${identifier}/picture`;
};

/**
 * Removes the user profile picture
 * @summary Delete Profile Picture
 */
export const deleteUserPicture = async (identifier: string, options?: Parameters<typeof customFetch>[1]): Promise<deleteUserPictureResponse> => {
  return customFetch<deleteUserPictureResponse>(getDeleteUserPictureUrl(identifier), {
    ...options,
    method: 'DELETE',
  });
};

export const getDeleteUserPictureMutationOptions = <
  TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteUserPicture>>, TError, { identifier: string }, TContext>;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<Awaited<ReturnType<typeof deleteUserPicture>>, TError, { identifier: string }, TContext> => {
  const mutationKey = ['deleteUserPicture'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteUserPicture>>, { identifier: string }> = (props) => {
    const { identifier } = props ?? {};

    return deleteUserPicture(identifier, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteUserPictureMutationResult = NonNullable<Awaited<ReturnType<typeof deleteUserPicture>>>;

export type DeleteUserPictureMutationError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429;

/**
 * @summary Delete Profile Picture
 */
export const useDeleteUserPicture = <TError = Unauthorized401 | Forbidden403 | NotFound404 | TooManyRequests429, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteUserPicture>>, TError, { identifier: string }, TContext>;
    request?: SecondParameter<typeof customFetch>;
  },
  queryClient?: QueryClient,
): UseMutationResult<Awaited<ReturnType<typeof deleteUserPicture>>, TError, { identifier: string }, TContext> => {
  return useMutation(getDeleteUserPictureMutationOptions(options), queryClient);
};
