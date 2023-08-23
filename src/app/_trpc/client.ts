/*
    _trpc => as any directory starting with an _ would be ignored by app router, in terms of routing
*/

import { createTRPCReact } from "@trpc/react-query"; // React Query adapter library
import { type AppRouter } from "@/server";
// getTodos would be a type coming out of that server, and that is how all teh types from the server code are router to the client code


export const trpc = createTRPCReact<AppRouter>({});