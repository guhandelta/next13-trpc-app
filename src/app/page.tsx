
/*The NestJS server would be serving a dual role
  Will serve the pages at /
  Will serve trpc endpoint off of /api/trpc/{trpc verb}
*/

import TodoList from "./_components/TodoList";

export default function Home() {
  return <main className="max-w-3xl max-auto mt-40 text-center items-center">
    <TodoList />
  </main>
}
