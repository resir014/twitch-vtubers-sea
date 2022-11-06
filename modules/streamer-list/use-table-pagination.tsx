import { PaginationState } from '@tanstack/react-table';
import * as React from 'react';

export function useTablePagination(defaultPageSize = 10) {
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  return {
    pagination,
    setPagination,
  };
}
