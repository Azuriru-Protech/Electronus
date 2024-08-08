export const APIPaths = {
  apiEndPoint: '/api',
  login: '/login',
  test: '/test',
} as const;

export type APIPaths = (typeof APIPaths)[keyof typeof APIPaths];
