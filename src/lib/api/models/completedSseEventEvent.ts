/**
 * Event type identifier
 */
export type CompletedSseEventEvent = (typeof CompletedSseEventEvent)[keyof typeof CompletedSseEventEvent];

export const CompletedSseEventEvent = {
  Completed: 'Completed',
} as const;
