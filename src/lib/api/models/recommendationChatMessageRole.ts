/**
 * Message author role in the conversation (user or model)
 */
export type RecommendationChatMessageRole = (typeof RecommendationChatMessageRole)[keyof typeof RecommendationChatMessageRole];

export const RecommendationChatMessageRole = {
  user: 'user',
  system: 'system',
  assistant: 'assistant',
} as const;
