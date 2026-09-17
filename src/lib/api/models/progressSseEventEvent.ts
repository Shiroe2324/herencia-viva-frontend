/**
 * Event type identifier
 */
export type ProgressSseEventEvent = (typeof ProgressSseEventEvent)[keyof typeof ProgressSseEventEvent];

export const ProgressSseEventEvent = {
  Progress: 'Progress',
} as const;
