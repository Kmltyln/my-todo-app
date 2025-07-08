import { useTodosContext } from "../lib/hooks";

interface DeleteButtonProps {
  id: string; // or 'number' if your id is a number
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { deleteTodo } = useTodosContext();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteTodo(Number(id));
      }}
    >
      ❌
    </button>
  );
}