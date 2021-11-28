import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList'

export interface Todo {
  name: string;
  completed: boolean;
  id: number;
  changing: boolean,
}

function App(): JSX.Element {

    function onDelete(id: number){
        setTodos(prevTodos => prevTodos.filter((prevTodo) => {
            return prevTodo.id !== id;
        }));
    };



  const [todos, setTodos] = useState<Todo[]> ([
    { id: 1, name: 'todo1', completed: false, changing: false },
    { id: 2, name: 'todo2', completed: false, changing: false },
    { id: 3, name: 'todo3', completed: false, changing: false },
  ]);

  return (
      <div>
        <TodoList
            todos={ todos }
            onDelete={ (id: number)=>onDelete(id)}
        />
      </div>
  );
}

export default App;
