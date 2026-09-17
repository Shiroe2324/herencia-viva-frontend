export type GetAllSessionLogsOrderBy = (typeof GetAllSessionLogsOrderBy)[keyof typeof GetAllSessionLogsOrderBy];

export const GetAllSessionLogsOrderBy = {
  id: 'id',
  sessionId: 'sessionId',
  status: 'status',
  failureReason: 'failureReason',
  ipAddress: 'ipAddress',
  country: 'country',
  city: 'city',
  browser: 'browser',
  os: 'os',
  deviceType: 'deviceType',
  revokedAt: 'revokedAt',
  createdAt: 'createdAt',
  user: 'user',
  userid: 'user.id',
  userusername: 'user.username',
  userdisplayName: 'user.displayName',
  userisEmailVerified: 'user.isEmailVerified',
  usercreatedAt: 'user.createdAt',
} as const;
