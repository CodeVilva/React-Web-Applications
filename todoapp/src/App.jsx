import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const toggleTask = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const removeTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const addTask = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text: text.trim(), completed: false };
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="app">
      <h1 className="app-title">Todo Task App</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="btn primary" onClick={addTask}>Add Task</button>
      </div>

      <div className="stats">
        <p>
          <strong>Total:</strong> {todos.length} &nbsp;|&nbsp; <strong>Completed:</strong> {completedCount} &nbsp;|&nbsp; <strong>Incomplete:</strong> {todos.length - completedCount}
        </p>
      </div>

      <section className="tasks">
        {todos.map((todo) => (
          <div key={todo.id} className={`todo ${todo.completed ? "completed" : ""}`}>
            <div className="todo-info">
              <p className="todo-text">{todo.text}</p>
              <p className="todo-status">{todo.completed ? "Completed" : "Not Completed"}</p>
            </div>
            <div className="todo-actions">
              <button className="btn" onClick={() => toggleTask(todo.id)}>{todo.completed ? "Undo" : "Complete"}</button>
              <button className="btn danger" onClick={() => removeTask(todo.id)}>Remove</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;