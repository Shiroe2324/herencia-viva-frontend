/**
 * Event type identifier
 */
export type DoneSseEventEvent = (typeof DoneSseEventEvent)[keyof typeof DoneSseEventEvent];

export const DoneSseEventEvent = {
  Done: 'Done',
} as const;
