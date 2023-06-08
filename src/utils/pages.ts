export const getPages = (totalCount: number, limit: number): number => {
  return Math.ceil(totalCount / limit);
};
