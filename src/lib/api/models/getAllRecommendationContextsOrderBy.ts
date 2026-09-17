export type GetAllRecommendationContextsOrderBy = (typeof GetAllRecommendationContextsOrderBy)[keyof typeof GetAllRecommendationContextsOrderBy];

export const GetAllRecommendationContextsOrderBy = {
  id: 'id',
  question: 'question',
  answer: 'answer',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;
