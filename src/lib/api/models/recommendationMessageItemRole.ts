/**
 * Message author within the conversation, either user or assistant.
 */
export type RecommendationMessageItemRole = (typeof RecommendationMessageItemRole)[keyof typeof RecommendationMessageItemRole];

export const RecommendationMessageItemRole = {
  user: 'user',
  system: 'system',
  assistant: 'assistant',
} as const;
