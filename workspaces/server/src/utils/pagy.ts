export function getPageNumberAndLimit(page: number, limit: number): number[] {
  const pageNumber = page > 0 ? page : 1;
  const take = limit > 0 ? limit : 5;
  const offset = (pageNumber - 1) * take;

  return [pageNumber, take, offset];
}
