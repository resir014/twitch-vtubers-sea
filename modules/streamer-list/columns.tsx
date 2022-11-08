/* eslint-disable @next/next/no-img-element */
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';
import { PlatformItem, VtubersResponseItem } from '../database/types';
import { SocialLinkButton } from './components/social-link-button';

const columnHelper = createColumnHelper<VtubersResponseItem>();

function renderSocialLinks(item: PlatformItem) {
  switch (item.type) {
    case 'website': {
      return (
        <SocialLinkButton href={item.link}>
          <span className="sr-only">Twitter</span>
          <GlobeAltIcon className="w-4 h-4" />
        </SocialLinkButton>
      );
    }
    case 'twitter': {
      return (
        <SocialLinkButton href={`https://twitter.com/${item.id}`}>
          <span className="sr-only">Twitter</span>
          <FontAwesomeIcon icon={faTwitter} />
        </SocialLinkButton>
      );
    }
    case 'youtube': {
      if (item.handle) {
        return (
          <SocialLinkButton href={`https://www.youtube.com/@${item.handle}`}>
            <span className="sr-only">YouTube</span>
            <FontAwesomeIcon icon={faYoutube} />
          </SocialLinkButton>
        );
      }

      if (item.vanity_url) {
        return (
          <SocialLinkButton href={`https://www.youtube.com/c/${item.vanity_url}`}>
            <span className="sr-only">YouTube</span>
            <FontAwesomeIcon icon={faYoutube} />
          </SocialLinkButton>
        );
      }

      return (
        <SocialLinkButton href={`https://www.youtube.com/channel/${item.id}`}>
          <span className="sr-only">YouTube</span>
          <FontAwesomeIcon icon={faYoutube} />
        </SocialLinkButton>
      );
    }
    default: {
      return null;
    }
  }
}

export const columns = [
  columnHelper.accessor(
    row => ({
      name: row.name,
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
                <span className="block font-medium truncated text-gray-900">{item.name}</span>
                {item.status === 'partner' ? (
                  <CheckBadgeIcon className="ml-0.5 w-4 h-4 text-indigo-500" />
                ) : null}
              </div>
              {item.username ? (
                <span className="block text-blue-500 group-hover:underline">
                  /{item.displayName}
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
  columnHelper.accessor('other_platforms', {
    header: 'Other Platforms',
    cell: info => {
      const items = info.getValue();
      return (
        <div className="flex items-center space-x-2">
          {items.map(item => renderSocialLinks(item))}
        </div>
      );
    },
  }),
];
