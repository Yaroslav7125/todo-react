import React, { useState } from 'react';
import { Button, Input, Checkbox } from 'antd';

import { Card } from './Card';

import 'antd/dist/antd.css';
import '../main.scss';
import styled from 'styled-components';

export interface Todo {
  name: string;
  completed: boolean;
  id: number;
  changing: boolean;
}

interface TodoItemProps extends Todo {
  onDelete: () => void;
  onChanging: (id: number, newTodoName: string) => void;
  onChangeCompleted: (id: number, completed: boolean) => void;
}

export const TodoItem = (todo: TodoItemProps) => {
  const [changingTodoName, setChangingTodoName] = useState(todo.name);
  return (
    <Card>
      <>
        <div style={{padding: '30px'}}>
          <Checkbox
              checked={todo.completed}
              onChange={(e) => {
                todo.onChangeCompleted(todo.id, e.target.checked);
              }}
          />
        </div>
        {todo.changing ? (
          <Input
            value={changingTodoName}
            onChange={(e) => {
              setChangingTodoName(e.target.value);
            }}
          />
        ) : (
          <h2
            style={{ margin: '0px', textDecoration: todo.completed ? 'line-through' : '' }}
            className={'text-decoration: line-through'}
          >
            {todo.name}
          </h2>
        )}
        <FlexWrap>
          <Button style={{margin: '5px'}} onClick={todo.onDelete} type="primary">
            Delete
          </Button>
          <Button style={{margin: '5px'}}
              onClick={() => {
                todo.onChanging(todo.id, changingTodoName); // как избавиться от коллбэка
              }}
              type="primary"
          >
            Edit
          </Button>
        </FlexWrap>
      </>
    </Card>
  );
};

const FlexWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
