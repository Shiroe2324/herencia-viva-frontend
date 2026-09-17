/**
 * Event type identifier
 */
export type ContentSseEventEvent = (typeof ContentSseEventEvent)[keyof typeof ContentSseEventEvent];

export const ContentSseEventEvent = {
  Content: 'Content',
} as const;
