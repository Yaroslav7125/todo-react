import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import styled from 'styled-components';

function App(): JSX.Element {
  return (
    <Container>
      <TodoList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App;
