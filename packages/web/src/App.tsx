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
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  Flex,
  useEditableControls,
} from '@chakra-ui/react';

import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
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
  };

  return (
    <TodoContext.Provider value={value}>
      {!loading && children}
    </TodoContext.Provider>
  );
};

const Add = () => {
  const [val, setVal] = useState('');

  const handleClick = () => {
    const query = gql`
      mutation {
        createTodo(text: "${val}") {
          id, text
        }
      }
    `;
    request(endpoint, query);
    window.location.reload();
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
  const { todos }: any = useTodos();

  const handleDelete = (id: number) => {
    const query = gql`
      mutation {
        deleteTodo(id: ${id}) {
          id
        }
      }
    `;
    request(endpoint, query);
    window.location.reload();
  };

  const handleUpdate = (id: number, text: string) => {
    const query = gql`
      mutation {
        updateTodo(id: ${id}, text: "${text}") {
          id
        }
      }
    `;
    request(endpoint, query);
    window.location.reload();
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton
          aria-label='submit'
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label='cancel'
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton
          aria-label='edit'
          size='sm'
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  };

  return (
    <Center>
      <UnorderedList>
        {todos.map((todo: Todo) => {
          return (
            <ListItem mb={2} key={todo.id}>
              <Editable
                defaultValue={todo.text}
                onSubmit={(text) => handleUpdate(todo.id, text)}
              >
                <Wrap>
                  <EditablePreview />
                  <EditableInput />
                  <EditableControls />
                  <IconButton
                    ml={5}
                    size='sm'
                    onClick={() => handleDelete(todo.id)}
                    icon={<DeleteIcon />}
                    aria-label='delete'
                  />
                </Wrap>
              </Editable>
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
        <StackItem>
          <Add />
        </StackItem>
        <StackItem>
          <TodoProvider>
            <Todos />
          </TodoProvider>
        </StackItem>
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
