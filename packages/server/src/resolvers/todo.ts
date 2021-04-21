import { Todo } from '../entity/Todo';

export const createTodo = async (
  _: any,
  { text }: any
): Promise<Todo | null> => {
  const todo = new Todo();
  todo.text = text;

  let result;
  try {
    result = await Todo.create(todo).save();
  } catch (e) {
    console.log(e);
    return null;
  }

  return result;
};

export const getTodos = async (): Promise<Todo[]> => {
  return await Todo.find();
};

export const getTodo = async (
  _: any,
  { id }: any
): Promise<Todo | undefined> => {
  return await Todo.findOne(id);
};

export const updateTodo = async (
  _: any,
  { id, text }: any
): Promise<Todo | null> => {
  const todo = await Todo.findOne(id);
  if (!todo) return null;
  todo.text = text;
  return await todo.save();
};

export const deleteTodo = async (_: any, { id }: any): Promise<Todo | null> => {
  const todo = await Todo.findOne(id);
  if (!todo) return null;
  return await todo?.remove();
};
