import { PaginationResponse } from '~/utils/pagination';

export type PlatformItem = {
  type: string;
  id?: string;
  vanity_url?: string;
};

export type StreamerTwitchData = {
  id: string;
  username: string;
  displayName: string;
  broadcasterType?: string;
  avatar?: string;
  followers: number;
  viewCount: number;
};

export type VtuberDetail = {
  readonly type: string;
  readonly id: string;
  readonly name: string;
  readonly birthday?: string | null;
  readonly persona?: string | null;
  readonly affiliation?: string | null;
  readonly other_platforms: PlatformItem[];
};

export type VtubersResponseItem = VtuberDetail & {
  twitch?: StreamerTwitchData | null;
};

export type GetVtubersResponse = {
  items: VtubersResponseItem[];
  pagination: PaginationResponse;
};
