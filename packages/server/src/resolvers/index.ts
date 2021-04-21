import { getTodos, getTodo, createTodo, deleteTodo, updateTodo } from './todo';

export const resolvers = {
  Query: {
    getTodos,
    getTodo,
  },
  Mutation: {
    createTodo,
    deleteTodo,
    updateTodo,
  },
};
