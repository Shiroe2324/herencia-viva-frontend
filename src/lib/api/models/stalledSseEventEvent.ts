/**
 * Event type identifier
 */
export type StalledSseEventEvent = (typeof StalledSseEventEvent)[keyof typeof StalledSseEventEvent];

export const StalledSseEventEvent = {
  Stalled: 'Stalled',
} as const;
