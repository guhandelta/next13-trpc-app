import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";

export const serverClient = appRouter.createCaller({
    // This is like the original client, but this is basic tRPC system, that anything can use, not only React or Angular or.... 
    links:[
        httpBatchLink({
            url: "http:localhost:3000/api/trpc",
        }),
    ],
});