import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { TheCard } from './components/TheCard';

export interface Todo {
  name: string;
  completed: boolean;
  id: number;
  changing: boolean;
}

function App(): JSX.Element {
  function onDelete(id: number) {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => {
        return prevTodo.id !== id;
      }),
    );
  }

  function onChanging(id: number, newTodoName: string) {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) => {
        if (prevTodo.id === id)
          return { ...prevTodo, changing: !prevTodo.changing, name: prevTodo.changing ? newTodoName : prevTodo.name };
        return prevTodo;
      }),
    );
  }

  async function onChangeCompleted(id: number, completed: boolean) {
    await setTodos((prevTodos) =>
      prevTodos.map((prevTodo) => {
        if (prevTodo.id === id) return { ...prevTodo, completed };
        return prevTodo;
      }),
    );
  }

  function filterTodoList(searchWord: string, todoList: Todo[]) {
    const lowerSearchWord = searchWord.toLowerCase();
    return todoList.filter((todo) => {
      return todo.name.toLowerCase().includes(lowerSearchWord);
    });
  }

  async function addTodo(newTodo: Todo) {
    await setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
    setTempValue('');
  }


  function getTodosFromLocalStorage(): Todo[] | undefined {
      // eslint-disable-next-line no-console
      console.log(localStorage.getItem('todos'));
      return JSON.parse(localStorage.getItem('todos') as string);
  }

  const [tempValue, setTempValue] = useState('');

  const [todos, setTodos] = useState<Todo[]>(getTodosFromLocalStorage() || [
    { id: 1, name: 'todo1', completed: false, changing: true },
    { id: 2, name: 'todo2', completed: true, changing: false },
    { id: 3, name: 'todo3', completed: false, changing: false },
  ]);

  const filteredTodoList = useMemo<Todo[]>(() => {
    return filterTodoList(tempValue, todos);
  }, [tempValue, todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  return (
    <Container>
      <TheCard>
        <CreatingTodoPart>
          <Input
            style={{ width: '250px' }}
            value={tempValue}
            onChange={(e) => {
              setTempValue(e.target.value);
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              if (tempValue.length)
                addTodo({ name: tempValue, completed: false, id: Number(Date.now()), changing: false });
            }}
          >
            Add
          </Button>
        </CreatingTodoPart>
      </TheCard>
      <TodoList
        todos={filteredTodoList}
        onDelete={(id: number) => onDelete(id)}
        onChanging={(id: number, newTodoName: string) => onChanging(id, newTodoName)}
        onChangeCompleted={(id: number, completed: boolean) => {
          onChangeCompleted(id, completed);
        }}
      />
    </Container>
  );
}

const CreatingTodoPart = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App;
