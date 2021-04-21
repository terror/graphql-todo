import { getTodos, getTodo, createTodo, deleteTodo } from './todo';

export const resolvers = {
  Query: {
    getTodos,
    getTodo,
  },
  Mutation: {
    createTodo,
    deleteTodo,
  },
};
