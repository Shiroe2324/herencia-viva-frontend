/**
 * Event type identifier
 */
export type ActiveSseEventEvent = (typeof ActiveSseEventEvent)[keyof typeof ActiveSseEventEvent];

export const ActiveSseEventEvent = {
  Active: 'Active',
} as const;
