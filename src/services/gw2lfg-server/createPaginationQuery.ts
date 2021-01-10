/*
Creates take, skip pagination query out of page
*/
export function createPaginationQuery(page: number) {
  const resultsPerPage = 10;

  const take = resultsPerPage;
  const skip = Math.max(0, (page - 1) * resultsPerPage);
  const query = `take=${take}&skip=${skip}`;

  return query;
}
