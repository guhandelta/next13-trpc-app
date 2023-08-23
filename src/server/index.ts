import { publicProcedure, router } from "./trpc";

/* Create a TRPC router that has the procedures on it
Create an instane of the appRouter using the router that was created in TRPC, and use that to add any fucntions that are necessary.*/
export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
        return [10, 20, 30, 40, 50]
    }),
});

export type AppRouter = typeof appRouter;