import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos",{
    id: integer("id").primaryKey(),
    content: text("content"),
    done: integer("done") // 0 => not done, 1 => done || It's an integer as SQLite3 does not have a boolean type
});