/* eslint-disable @next/next/no-img-element */
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';
import { VtubersResponseItem } from '../database/types';

const columnHelper = createColumnHelper<VtubersResponseItem>();

export const columns = [
  columnHelper.accessor(
    row => ({
      username: row.twitch?.username,
      status: row.twitch?.broadcasterType,
      displayName: row.twitch?.displayName,
      avatar: row.twitch?.avatar,
    }),
    {
      id: 'displayName',
      header: 'Username',
      cell: info => {
        const item = info.getValue();

        if (!item.username) {
          return (
            <span className="block font-medium text-red-700">
              Invalid user: twitch details not found.
            </span>
          );
        }

        return (
          <a
            href={`https://www.twitch.tv/${item.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-4"
          >
            {item.avatar ? (
              <div className="h-10 w-10 flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={item.avatar}
                  alt={`${item.displayName}'s avatar`}
                />
              </div>
            ) : null}
            <div>
              <div className="flex items-center min-w-0">
                <span className="block font-medium truncated text-gray-900">
                  {item.displayName}
                </span>
                {item.status === 'partner' ? (
                  <CheckBadgeIcon className="ml-0.5 w-4 h-4 text-indigo-500" />
                ) : null}
              </div>
              {item.username ? (
                <span className="block text-blue-500 group-hover:underline">
                  https://www.twitch.tv/{item.username}
                </span>
              ) : null}
            </div>
          </a>
        );
      },
    }
  ),
  columnHelper.accessor(row => row.twitch?.followers, {
    id: 'followers',
    header: 'Followers',
    cell: info => {
      const value = info.getValue();
      return value ? Intl.NumberFormat('en-GB').format(value) : undefined;
    },
  }),
  columnHelper.accessor(row => row.twitch?.viewCount, {
    id: 'viewCount',
    header: 'Views',
    cell: info => {
      const value = info.getValue();
      return value ? Intl.NumberFormat('en-GB').format(value) : undefined;
    },
  }),
  columnHelper.accessor('birthday', {
    header: 'Birthday',
    cell: info => info.getValue() ?? '-',
  }),
  columnHelper.accessor('persona', {
    header: 'Persona',
    cell: info => info.getValue() ?? '-',
  }),
  columnHelper.accessor('affiliation', {
    header: 'Affiliation',
    cell: info => info.getValue() ?? '-',
  }),
];
