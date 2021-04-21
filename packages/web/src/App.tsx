import React, { useEffect, useState, createContext, useContext } from 'react';
import Wave from 'react-wavify';

import {
  Center,
  Stack,
  Text,
  Heading,
  UnorderedList,
  ListItem,
  Button,
  Input,
  Wrap,
  WrapItem,
  StackItem,
} from '@chakra-ui/react';

import { endpoint } from './lib/fetcher';
import { request, gql } from 'graphql-request';
import { ColorModeSwitcher } from './ColorModeSwitcher';

interface Todo {
  id: number;
  text: string;
}

const TodoContext = createContext({});

const useTodos = () => {
  return useContext(TodoContext);
};

const TodoProvider = ({ children }: any) => {
  const [todos, setTodos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = gql`
      query {
        getTodos {
          id
          text
        }
      }
    `;
    request(endpoint, query).then((data) => setTodos(data.getTodos));
    setLoading(false);
  }, []);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {!loading && children}
    </TodoContext.Provider>
  );
};

const Add = () => {
  const { setTodos }: any = useTodos();
  const [val, setVal] = useState('');

  const handleClick = () => {
    const query = gql`
      mutation {
        createTodo(text: "${val}") {
          id, text
        }
      }
    `;
    request(endpoint, query).then((data) => {
      const { id, text } = data.createTodo;
      setTodos((prevState: Todo[]) => [...prevState, { id, text }]);
    });
  };

  const handleChange = (e: any) => {
    setVal(e.target.value);
  };

  return (
    <Wrap>
      <WrapItem>
        <Input
          onChange={handleChange}
          variant='flushed'
          placeholder='Add Todo!'
        />
      </WrapItem>
      <WrapItem>
        <Button onClick={handleClick}>Submit</Button>
      </WrapItem>
    </Wrap>
  );
};

const Todos = () => {
  const { todos, setTodos }: any = useTodos();

  const handleDelete = (id: number) => {
    const query = gql`
      mutation {
        deleteTodo(id: ${id}) {
          id
        }
      }
    `;
    request(endpoint, query).then((data) => {
      setTodos(todos.filter((todo: Todo) => todo.id !== data.deleteTodo.id));
    });
  };

  return (
    <Center>
      <UnorderedList>
        {todos.map((todo: Todo) => {
          return (
            <ListItem
              mb={2}
              key={todo.id}
              onClick={() => handleDelete(todo.id)}
            >
              {todo.text}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Center>
  );
};

export const App = () => {
  return (
    <Center>
      <Stack alignItems='center' spacing='30px'>
        <Heading mt={2} fontStyle='italic'>
          GraphQL Todo!
        </Heading>
        <ColorModeSwitcher />
        <Text>
          A fast, simple, robust and intuitive solution to your task management
          needs
        </Text>

        <TodoProvider>
          <StackItem>
            <Add />
          </StackItem>
          <StackItem>
            <Todos />
          </StackItem>
        </TodoProvider>
      </Stack>
      <Wave
        fill='#ff9bf5'
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.3,
          points: 5,
        }}
        style={{ position: 'fixed', bottom: -100 }}
      />
    </Center>
  );
};
