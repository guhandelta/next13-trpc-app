import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
// For input Validation
import { z } from 'zod'

import { publicProcedure, router } from "./trpc";
import { todos } from "@/db/schema";

// Setup SQLite3 DB
const sqlite = new Database("sqlite.db");
// Point the DB to the DB that the app is connected to, and then create DB Drizzle Object
const db = drizzle(sqlite);
// Migrate using that DB and the directory that was just created
migrate(db, { migrationsFolder: "drizzle" });

/* Create a TRPC router that has the procedures on it
Create an instane of the appRouter using the router that was created in TRPC, and use that to add any fucntions that are necessary.*/
export const appRouter = router({
    // Endpoint to Get the Todos from the DB
    getTodos: publicProcedure.query(async () => {
        // Select that DB and fetch all the values from the Todos Table
        return await db.select().from(todos).all();
    }),
    // Endpoint to add a new Todo to the DB
    addTodo: publicProcedure.input(z.string()).mutation(async options=> {
        // input(z.string) => just get the contents from the input
        await db.insert(todos).values({ content: options.input, done: 0 }).run();
        return true;
    })
});

export type AppRouter = typeof appRouter;