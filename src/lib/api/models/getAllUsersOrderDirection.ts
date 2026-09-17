export type GetAllUsersOrderDirection = (typeof GetAllUsersOrderDirection)[keyof typeof GetAllUsersOrderDirection];

export const GetAllUsersOrderDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;
