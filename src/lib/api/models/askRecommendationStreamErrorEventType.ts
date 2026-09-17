/**
 * Discriminant field with value "error" to identify this event type.
 */
export type AskRecommendationStreamErrorEventType =
  (typeof AskRecommendationStreamErrorEventType)[keyof typeof AskRecommendationStreamErrorEventType];

export const AskRecommendationStreamErrorEventType = {
  metadata: 'metadata',
  content: 'content',
  error: 'error',
  done: 'done',
} as const;
