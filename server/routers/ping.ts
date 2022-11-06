import { publicProcedure, router } from '../trpc';

export const pingRouter = router({
  ping: publicProcedure.query(() => {
    return {
      message: 'Hello world!',
    };
  }),
});
