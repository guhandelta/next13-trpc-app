"use client";

import { useState } from "react";
import { trpc } from "../_trpc/Client";
import { serverClient } from "../_trpc/serverClient";

export default function TodoList({ 
        initialTodos 
    }:{ 
        initialTodos: 
        // initialTodos would be wrapped up in a promise, and to unwrap that promise the returned value is wrapped within an Await
            Awaited<ReturnType<(typeof serverClient)["getTodos"]>> 
    }){
    const getTodos = trpc.getTodos.useQuery(undefined, { initialData: initialTodos });
    const addTodo = trpc.addTodo.useMutation({
        onSettled: () => {
            // refetch the todos after adding a new one to make sure it's there!
            getTodos.refetch();
        }
    });
    const setDone = trpc.setDone.useMutation({
        onSettled: () => {
            // refetch the todos after adding a new one to make sure it's there!
            getTodos.refetch();
        }
    });
    
    const [ content, setContent ] = useState("");

    return(
        <div>
            <div className="mb-20 text-white my-5 text-3xl">
                {
                    // Usually the return type of the data from db would be `any` in case of JS app, but here tRPC would preserve the types, all the way from the schema, to the client(for both the Queries adn the Mutation), though Drizzle, and RPC calls.
                    getTodos?.data?.map(({ id, content, done }) => (
                        <div 
                            key={id} 
                            className="flex gap-3 items-center"
                        >
                            <input 
                                id={`check-${id}`}
                                type="checkbox"
                                checked={!!done}
                                onChange={async () => {
                                    setDone.mutate({
                                        id,
                                        // Just flip the value, whatever it was
                                        done: done ? 0 : 1,
                                    });
                                }}
                            />
                            <label htmlFor={`check-${id}`}
                            >
                                {content}
                            </label>
                        </div>
                    ))
                }
            </div>
            <div>
                <label htmlFor="">Content</label> <br /><br /><br />
                <input 
                    type="text" 
                    id="content" 
                    className="text-black flex-grow bg-white rounded-md border-gray-300 shadow-sm" 
                    onChange={e => setContent(e.target.value)}
                /><br /><br />
                <button 
                    className="border-dashed border-2 px-4 py-2  border-white hover:border-sky-500 hover:border-solid hover:bg-teal-400 hover:text-black "
                    onClick={async () => {
                        if(content.length){ 
                            addTodo.mutate(content);
                            setContent("");
                        }
                    }}
                >
                    Add Todo
                </button>
            </div>
        </div>
    );
}