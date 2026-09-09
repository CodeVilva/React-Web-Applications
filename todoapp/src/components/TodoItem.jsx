export default function TodoItem({ todo, onImportant, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark ${todo.text} ${todo.completed ? "incomplete" : "complete"}`}
        />
        <span className="todo-text">{todo.text}</span>
      </label>

      <div className="todo-actions">
        <button className={`btn ${todo.important ? 'bgChange' : ''}`} onClick={() => onImportant(todo.id)} aria-label="Toggle">
          ⭐
        </button>
        <button className="btn" onClick={() => onToggle(todo.id)} aria-label="Toggle">
          {todo.completed ? "Undo" : "Done"}
        </button>
        <button className="btn danger" onClick={() => onDelete(todo.id)} aria-label="Delete">
          Delete
        </button>
      </div>
    </li>
  );
}