import { useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoStats from "./components/TodoStats.jsx";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(text) {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo</h1>
        <p className="subtitle">Focus on what matters — small wins every day.</p>
      </header>

      <main className="app-main">
        <TodoForm onAddTodo={addTodo} />
        <TodoStats todos={todos} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </main>

      <footer className="app-footer">
        <small>{todos.length === 0 ? "No tasks yet" : `${todos.length} tasks`}</small>
      </footer>
    </div>
  );
}

export default App;