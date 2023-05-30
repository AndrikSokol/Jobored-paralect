export const getPages = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};
