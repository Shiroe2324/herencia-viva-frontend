/**
 * Event type identifier
 */
export type FailedSseEventEvent = (typeof FailedSseEventEvent)[keyof typeof FailedSseEventEvent];

export const FailedSseEventEvent = {
  Failed: 'Failed',
} as const;
