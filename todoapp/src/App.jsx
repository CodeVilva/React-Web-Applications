import { useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoStats from "./components/TodoStats.jsx";
import TodoList from "./components/TodoList.jsx";
import Completed from "./pages/Completed.jsx";
import Pending from "./pages/Pending.jsx";
import Important from "./pages/Important.jsx"
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState("home");

  function addTodo(text) {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false, important: false }
    ]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }
  function setImportant(id){
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    )
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }
  const callFilter = (targetValue) => {
  if (targetValue !== "default") {
    setPage(targetValue);
  }
};
  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo</h1>
        <p className="subtitle">Focus on what matters — small wins every day.</p>

        <div className="filter-block">
          <label>Filter </label>
          <select onChange={(e) => callFilter(e.target.value)}>
            <option value="home">Select Filter</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="important">Important</option>
          </select>
        </div>
      </header>

      <main className="app-main">
        {page == "home" &&
        <div>
        <TodoForm onAddTodo={addTodo} />
        <TodoStats todos={todos} />
        <TodoList todos={todos} setImportant={setImportant} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
        }
        {page == "completed" &&
          <div>
            <TodoStats todos={todos} />
            <Completed todos={todos} setImportant={setImportant} onToggle={toggleTodo} onDelete={deleteTodo} />
          </div>
        }
        {page == "pending" &&
          <div>
            <TodoStats todos={todos} />
            <Pending todos={todos} setImportant={setImportant} onToggle={toggleTodo} onDelete={deleteTodo} />
          </div>
        }
        {page == "important" &&
          <div>
            <TodoStats todos={todos} />
            <Important todos={todos} setImportant={setImportant} onToggle={toggleTodo} onDelete={deleteTodo} />
          </div>
        }
      </main>

      <footer className="app-footer">
        <small>{todos.length === 0 ? "No tasks yet" : `${todos.length} tasks`}</small>
      </footer>
    </div>
  );
}
export default App;