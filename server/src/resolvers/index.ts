import { getTodos, getTodo, createTodo } from './todo';

export const resolvers = {
  Query: {
    getTodos,
    getTodo,
  },
  Mutation: {
    createTodo,
  },
};
