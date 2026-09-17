/**
 * Discriminant field with value "content" to identify this event type.
 */
export type AskRecommendationStreamContentEventType =
  (typeof AskRecommendationStreamContentEventType)[keyof typeof AskRecommendationStreamContentEventType];

export const AskRecommendationStreamContentEventType = {
  metadata: 'metadata',
  content: 'content',
  error: 'error',
  done: 'done',
} as const;
