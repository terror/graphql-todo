import 'reflect-metadata';
import { createTypeormConn } from './src/utils/createTypeormConn';
import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './src/resolvers';

const main = () => {
  const typeDefs = `
    type Todo {
      id: Int
      text: String
    }

    type Query {
        getTodos: [Todo]
        getTodo(id: Int) : Todo
    }

    type Mutation {
      createTodo(text: String!) : Todo
    }
`;

  // create db connection
  createTypeormConn();

  // start server
  const server = new GraphQLServer({ typeDefs, resolvers });
  server.start(() => console.log('Server is running on localhost:4000'));
};

main();
