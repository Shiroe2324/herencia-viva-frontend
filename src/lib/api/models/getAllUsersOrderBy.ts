export type GetAllUsersOrderBy = (typeof GetAllUsersOrderBy)[keyof typeof GetAllUsersOrderBy];

export const GetAllUsersOrderBy = {
  id: 'id',
  username: 'username',
  displayName: 'displayName',
  isEmailVerified: 'isEmailVerified',
  lastLoginAt: 'lastLoginAt',
  roles: 'roles',
  rolesid: 'roles.id',
  rolesname: 'roles.name',
  picture: 'picture',
  pictureid: 'picture.id',
  pictureurl: 'picture.url',
  picturejobId: 'picture.jobId',
  pictureprocessing: 'picture.processing',
  pictureorigin: 'picture.origin',
  picturecreatedAt: 'picture.createdAt',
  pictureupdatedAt: 'picture.updatedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  email: 'email',
} as const;
