import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAddTodo(value);
    setText("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Add todo">
      <input
        className="task-input"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Task"
        autoComplete="off"
      />
      <button className="btn primary" type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
}