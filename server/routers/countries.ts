import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const countriesRouter = router({
  getAllCountries: publicProcedure.query(async () => {
    const { default: countries } = await import('~/modules/database/countries');

    if (!countries.length) {
      return [];
    }

    return countries;
  }),
  getCountryByCode: publicProcedure
    .input(
      z.object({
        country: z.string().optional(),
      })
    )
    .query(async ({ input: { country } }) => {
      const { default: countries } = await import('~/modules/database/countries');

      if (!country) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Please input a country code.',
        });
      }

      if (!countries.length) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No countries in database.',
        });
      }

      const data = countries.find(item => item.id === country);

      return data;
    }),
});
