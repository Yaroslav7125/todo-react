import { TodoItem, Todo } from './TodoItem';
import React from 'react';
interface Todos {
  todos: Todo[];
  onDelete: (id: number) => void;
  onChanging: (id: number, newTodoName: string) => void;
  onChangeCompleted: (id: number, completed: boolean) => void;
}
export const TodoList = ({ todos, onDelete, onChanging, onChangeCompleted }: Todos) => {
  return (
    <div>
      {todos.map((todoItem) => {
        return (
          <TodoItem
            onDelete={() => onDelete(todoItem.id)}
            onChanging={onChanging}
            onChangeCompleted={onChangeCompleted}
            {...todoItem}
              key={todoItem.id}
          />
        );
      })}
    </div>
  );
};
