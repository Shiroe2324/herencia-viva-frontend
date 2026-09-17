/**
 * Discriminant field with value "done" to identify this event type.
 */
export type AskRecommendationStreamDoneEventType = (typeof AskRecommendationStreamDoneEventType)[keyof typeof AskRecommendationStreamDoneEventType];

export const AskRecommendationStreamDoneEventType = {
  metadata: 'metadata',
  content: 'content',
  error: 'error',
  done: 'done',
} as const;
