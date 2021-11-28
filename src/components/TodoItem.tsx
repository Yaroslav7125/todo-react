import React, {FC}from 'react'

export interface Todo {
    name: string;
    completed: boolean;
    id: number;
    changing: boolean,

}

interface TodoItemProps extends Todo {
    onDelete: ()=>void,
}

export const TodoItem = (todo: TodoItemProps )=>{
    return <div onClick={todo.onDelete}><h2>{todo.name}</h2></div>
}