import { createContext, useEffect, useState } from "react";
import { Todo } from "../lib/types";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

type TodosContextType = {
  todos: Todo[];
  isLoading: boolean;
  totalCount: number;
  completedCount: number;
  addTodo: (content: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export const TodosContext = createContext<TodosContextType | undefined>(undefined);

type TodosContextProviderProps = {
  children: React.ReactNode;
};

export default function TodosContextProvider({ children }: TodosContextProviderProps) {
  const { isAuthenticated } = useKindeAuth();

  // state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // derived state
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  // actions / event handlers
  const addTodo = (content: string) => {
    // check if user is logged in
    if (todos.length >= 3 && !isAuthenticated) {
      alert("To add more todos, please log in.");
      return;
    }

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        content,
        completed: false,
      },
    ]);
  };
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // side effects
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://bytegrad.com/course-assets/api/todos"
      );
      const todos = await response.json();
      setTodos(todos);

      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        totalCount,
        completedCount,
        addTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}