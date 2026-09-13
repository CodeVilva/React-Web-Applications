import { createContext, useReducer } from "react";
import "./App.css";
import Todoinput from "./component/Todoinput";
import Todostats from "./component/Todostats";
import Todolist from "./component/Todolist";
import Todoactions from "./component/Todoactions";
import Todofilter from "./component/Todofilter";

export const TodoContext = new createContext();
const initialTodos = [];
const initialFilter = "all";


function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, todos: [...state.todos, action.payload] };

    case "delete":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case "important":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, important: !todo.important }
            : todo
        ),
      };
    case "toggle":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "clearCompleted":
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case "clearAll":
      return {
        ...state,
        todos: initialTodos,
      };

    case "setFilter":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

function App() {

  const [{ todos, filter }, dispatch] = useReducer(todoReducer, {
    todos: initialTodos,
    filter: initialFilter,
  });

  return (
    <>
    <TodoContext.Provider value={{ todos, filter, dispatch }}>
      <div className="container">
        <div className="header">Todo App</div>
        <Todoinput />
        <Todofilter />
        <Todostats />
        <Todolist />
        <Todoactions />
      </div>
    </TodoContext.Provider>
    </>
  );
}

export default App;

