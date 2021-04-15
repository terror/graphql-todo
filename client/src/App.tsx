import * as React from 'react';
import Wave from 'react-wavify';
import { Center, Heading, Stack, Text } from '@chakra-ui/layout';

export const App = () => {
  return (
    <>
      <Center>
        <Stack alignItems='center'>
          <Heading mt={2} fontStyle='italic'>
            GraphQL Todo!
          </Heading>
          <Text>
            A fast, simple, robust and intuitive solution to your task
            management needs
          </Text>
        </Stack>
      </Center>
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
    </>
  );
};
