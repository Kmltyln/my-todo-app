import { useTodosContext } from "../lib/hooks";

type DeleteButtonProps = {
  id: string | number;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { deleteTodo } = useTodosContext() as { deleteTodo: (id: number) => void };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteTodo(typeof id === "number" ? id : Number(id));
      }}
    >
      ❌
    </button>
  );
}