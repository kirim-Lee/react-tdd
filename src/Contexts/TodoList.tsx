import { createContext, useEffect, useState } from 'react';

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

const TODO_LIST = 'TodoList';

const TodoListProvider = ({ children }: IProps): JSX.Element => {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (toDo: string) => {
    if (!toDo) return;

    const newList = [...todoList, toDo];
    localStorage.setItem(TODO_LIST, JSON.stringify(newList));
    setTodoList(newList);
  };

  const deleteTodo = (index: number) => {
    let list = [...todoList];
    list.splice(index, 1);
    localStorage.setItem(TODO_LIST, JSON.stringify(list));
    setTodoList(list);
  };

  useEffect(() => {
    const list = localStorage.getItem(TODO_LIST);
    if (list) {
      setTodoList(JSON.parse(list));
    }
  }, []);

  return (
    <TodoListContext.Provider value={{ todoList, addTodo, deleteTodo }}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };
