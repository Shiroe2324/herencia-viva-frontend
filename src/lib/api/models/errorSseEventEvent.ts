/**
 * Event type identifier
 */
export type ErrorSseEventEvent = (typeof ErrorSseEventEvent)[keyof typeof ErrorSseEventEvent];

export const ErrorSseEventEvent = {
  Error: 'Error',
} as const;
