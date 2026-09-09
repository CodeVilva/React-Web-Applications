import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos = [], setImportant, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">You're all caught up — add a task to get started.</p>;
  }

  return (
    <ul className="todo-list" aria-live="polite">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onImportant={setImportant} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}