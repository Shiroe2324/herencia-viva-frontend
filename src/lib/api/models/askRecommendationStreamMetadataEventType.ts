/**
 * Discriminant field with value "metadata" to identify this event type.
 */
export type AskRecommendationStreamMetadataEventType =
  (typeof AskRecommendationStreamMetadataEventType)[keyof typeof AskRecommendationStreamMetadataEventType];

export const AskRecommendationStreamMetadataEventType = {
  metadata: 'metadata',
  content: 'content',
  error: 'error',
  done: 'done',
} as const;
