import React, { FC } from 'react'
import { TodoItem, Todo } from './TodoItem'
interface  Todoes {
    todos: Todo[],
    onDelete: (id: number)=> void,
}
export const TodoList = ({ todos, onDelete }: Todoes ) => {
return (
    <div>
        {
        todos.map((todoItem) => {
            return <TodoItem onDelete={()=>onDelete(todoItem.id)}  {...todoItem} />
        })
    }
    </div>
)
}