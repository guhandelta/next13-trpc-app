import { initTRPC } from "@trpc/server";
// Initialize a TRPC server
const t = initTRPC.create();
// Extract the router and publicProcedure from the TRPC server that was initialized
export const router = t.router;
export const publicProcedure = t.procedure;