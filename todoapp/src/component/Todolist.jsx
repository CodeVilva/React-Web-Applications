import { useContext } from "react";
import { TodoContext } from "../App";

function Todolist(){

  const {todos, filter, dispatch} = useContext(TodoContext);

  const visibleTodos = todos.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    if (filter === "important") return task.important;
    return true;
  });

  return(
        <div>
        {visibleTodos.length > 0 ?
        (visibleTodos.map((task) => {
          return(
            <div key={task.id} className="todo-item">
              <div className="todo-text">
                {task.text}
              </div>
              <div className="todo-meta">
                {task.completed ? 'Completed' : 'Pending'}
              </div>
              <div className="todo-meta">
                {task.important ? '⭐' : ''}
              </div>
              <div className="todo-actions">
                <button
                  className="todo-btn important-btn"
                  onClick={() => dispatch({ type: "important", payload: task.id })}
                >
                  ⭐
                </button>
                <button
                  className="todo-btn toggle-btn"
                  onClick={() => dispatch({ type: "toggle", payload: task.id })}
                >
                  Toggle
                </button>
                <button
                  className="todo-btn delete-btn"
                  onClick={() => dispatch({ type: "delete", payload: task.id })}
                >
                  Delete
                </button>
              </div>
            </div>
          )})) : (
            <div>
              <p>No tasks available</p>
            </div>
          )
      }

      </div>
  );
}

export default Todolist;