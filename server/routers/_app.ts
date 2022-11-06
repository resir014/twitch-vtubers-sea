import { mergeRouters } from '../trpc';
import { countriesRouter } from './countries';
import { pingRouter } from './ping';
import { vtubersRouter } from './vtubers';

export const appRouter = mergeRouters(pingRouter, countriesRouter, vtubersRouter);

export type AppRouter = typeof appRouter;
