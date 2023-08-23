
/*The NestJS server would be serving a dual role
  Will serve the pages at /
  Will serve trpc endpoint off of /api/trpc/{trpc verb}
*/

import TodoList from "./_components/TodoList";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  // This req is a type safe request
  const todos = await serverClient.getTodos();
  return <main className="max-w-3xl max-auto mt-40 ml-52 text-center items-center">
    <TodoList initialTodos={todos} />
  </main>
}
