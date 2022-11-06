import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';
import { trpc } from '~/utils/trpc';
import { columns } from './streamer-list-table-config';
import { useTablePagination } from './use-table-pagination';

export interface PaginatedStreamerListTableProps {
  country?: string;
  debug?: boolean;
}

export function PaginatedStreamerListTable({ country, debug }: PaginatedStreamerListTableProps) {
  const { pagination, setPagination } = useTablePagination();
  const { pageIndex, pageSize } = pagination;

  const defaultData = React.useMemo(() => [], []);

  const { data, isError, error } = trpc.getVtubers.useQuery({
    country,
    page: pageIndex + 1,
    take: pageSize,
  });

  const isLoading = React.useMemo(() => !data && !error, [data, error]);

  const table = useReactTable({
    data: data?.items ?? defaultData,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    pageCount: data?.pagination.totalPages ?? -1,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: debug,
  });

  const renderPageNumbers = () => {
    const totalItems = data?.pagination.totalItems ?? 0;
    const paginationState = table.getState().pagination;
    const lowNumber =
      (paginationState.pageIndex + 1) * paginationState.pageSize - (paginationState.pageSize - 1);
    const highNumber = (paginationState.pageIndex + 1) * paginationState.pageSize;

    return (
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{lowNumber}</span> to{' '}
        <span className="font-medium">{highNumber < totalItems ? highNumber : totalItems}</span> of{' '}
        <span className="font-medium">{data?.pagination.totalItems}</span> results
      </p>
    );
  };

  return (
    <>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <th
                          key={header.id}
                          scope="col"
                          className={clsx(
                            'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900',
                            index === 0 ? 'sm:pl-6' : null,
                            index + 1 === headerGroup.headers.length ? 'sm:pr-6' : null
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isError ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 sm:pr-6"
                      >
                        <span className="text-red-500">{error.message}</span>
                      </td>
                    </tr>
                  ) : isLoading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 sm:pr-6"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell, index) => (
                          <td
                            key={cell.id}
                            className={clsx(
                              'whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900',
                              index === 0 ? 'sm:pl-6' : null,
                              index + 1 === row.getVisibleCells().length ? 'sm:pr-6' : null
                            )}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <nav
          className="flex items-center justify-between border-t border-gray-200 py-3"
          aria-label="Pagination"
        >
          <div className="flex items-center space-x-6">
            <div className="hidden sm:block">{renderPageNumbers()}</div>
            {!isError && isLoading ? <p className="text-sm text-gray-700">Loading...</p> : null}
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <button
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </nav>
        {debug ? (
          <div className="space-y-2">
            <div>{table.getRowModel().rows.length} Rows</div>
            <pre>{JSON.stringify(pagination, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </>
  );
}
