import React, { useState } from 'react';
import Wave from 'react-wavify';
import useSWR from 'swr';

import {
  Center,
  Stack,
  Text,
  Heading,
  Spinner,
  UnorderedList,
  ListItem,
  Button,
  Input,
  Wrap,
  WrapItem,
  StackItem,
} from '@chakra-ui/react';

import { fetcher } from './lib/fetcher';
import { useQuery } from './lib/useQuery';

interface Todo {
  id: number;
  text: string;
}

const Add = () => {
  const [val, setVal] = useState('');

  const handleClick = () => {
    console.log(val);
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
  const { data, error } = useSWR(useQuery(), fetcher);

  const handleDelete = () => {};

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  if (!data)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <Center>
      <UnorderedList>
        {data.getTodos.map((todo: Todo) => {
          return (
            <ListItem mb={2} key={todo.id} onClick={handleDelete}>
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
        <Text>
          A fast, simple, robust and intuitive solution to your task management
          needs
        </Text>
        <StackItem>
          <Add />
        </StackItem>
        <StackItem>
          <Todos />
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
