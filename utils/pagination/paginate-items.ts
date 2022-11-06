import { PaginationResponse } from './types';

export function paginateItems<T = unknown>(items: T[], page = 1, take = 10) {
  // https://stackoverflow.com/a/42761393
  const data = items.slice((page - 1) * take, page * take);

  const pagination: PaginationResponse = {
    page,
    take,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / take),
  };

  return {
    data,
    pagination,
  };
}
