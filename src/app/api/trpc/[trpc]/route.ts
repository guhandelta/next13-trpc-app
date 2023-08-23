// import { appRouter } from "@/server";
import { appRouter } from "@/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

/*
    This file is to connect the getTodos endpoint to the AppRouter, to define it as a route, to allow routing the request to the specific TRPC instance.

    api/trpc/[trpc]/ => [trpc] would capture and represent the whatever the verb is, lik getTodos, and will set that as one of the route params.

    One difference here to highlight the distinction between using /pages and app router, is that the /pages has adapters configured, specific to NextJS, which does not work with the App router. The Fetch adapter, can be used with app router, as it happens to have the exactly the same signatures that is required for teh route handlers in NextJS, for the app router.
*/

const handler = ( req: Request ) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({}),
    });

export { handler as GET, handler as POST };