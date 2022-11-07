/* eslint-disable no-await-in-loop */
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
  GetVtubersResponse,
  StreamerTwitchData,
  VtubersResponseItem,
} from '~/modules/database/types';
import { getTwitchFollowers, getTwitchToken, getTwitchUsers } from '~/utils/twitch/twitch-api';
import { paginateItems } from '~/utils/pagination';
import { publicProcedure, router } from '../trpc';
import { getDatabase } from '../procedures/vtubers/get-database';

export const vtubersRouter = router({
  getVtubers: publicProcedure
    .input(
      z.object({
        country: z.string().optional(),
        page: z.number().optional(),
        take: z.number().optional(),
      })
    )
    .query(async ({ input: { country, page = 1, take = 10 } }) => {
      const token = await getTwitchToken();
      const responseData: VtubersResponseItem[] = [];

      if (!country) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Please input a country code.',
        });
      }

      if (!token.access_token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No access token supplied.',
        });
      }

      const vtubers = await getDatabase(country);

      if (!vtubers.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Sorry, we don't have the data for this country yet.",
        });
      }

      const { data, pagination } = paginateItems(vtubers, page, take);

      // Map ids in database to Twitch logins and get all Twitch API data (except follows)
      const logins = data.map(item => item.id.toLowerCase());
      const { data: twitchUsers } = await getTwitchUsers(token.access_token, logins);

      for (const databaseItem of data) {
        const twitchUser = twitchUsers.find(item => databaseItem.id === item.login);
        let twitchData: StreamerTwitchData | null = null;

        if (twitchUser) {
          const { total } = await getTwitchFollowers(token.access_token, twitchUser.id);

          twitchData = {
            id: twitchUser.id,
            username: twitchUser.login,
            displayName: twitchUser.display_name,
            followers: total,
            viewCount: twitchUser.view_count,
            broadcasterType: twitchUser.broadcaster_type,
            avatar: twitchUser.profile_image_url,
          };
        }

        const finalData: VtubersResponseItem = {
          ...databaseItem,
          twitch: twitchData,
        };

        responseData.push(finalData);
      }

      return {
        items: responseData,
        pagination,
      } as GetVtubersResponse;
    }),
});
