"use client";

import { useState } from "react";
import { trpc } from "../_trpc/Client";

export default function TodoList(){
    const getTodos = trpc.getTodos.useQuery();
    const addTodo = trpc.addTodo.useMutation({
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
                    getTodos?.data?.map(({ id, content, done }) => (
                        <div 
                            key={id} 
                            className="flex gap-3 items-center"
                        >
                            <input 
                                id={`check-${id}`}
                                type="checkbox"
                                checked={!!done}
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