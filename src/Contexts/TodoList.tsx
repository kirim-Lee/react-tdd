import { createContext, useState } from 'react';

interface IContext {
  readonly todoList: string[];
  readonly addTodo: (toDo: string) => void;
  readonly deleteTodo: (index: number) => void;
}

const TodoListContext = createContext<IContext>({
  todoList: [],
  addTodo: () => {},
  deleteTodo: () => {},
});

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const TodoListProvider = ({ children }: IProps): JSX.Element => {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (toDo: string) => setTodoList([...todoList, toDo]);

  const deleteTodo = (index: number) => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
  };

  return (
    <TodoListContext.Provider value={{ todoList, addTodo, deleteTodo }}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };
