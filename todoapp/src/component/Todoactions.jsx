import { useContext } from "react";
import { TodoContext } from "../App";

function Todoactions(){
  const {dispatch} = useContext(TodoContext);
  return(
    <div className="actions-group">
      <button
        className="action-btn"
        onClick={() => dispatch({ type: "clearCompleted" })}
      >
        Clear Completed
      </button>
      <button
        className="action-btn"
        onClick={() => dispatch({ type: "clearAll" })}
      >
        Clear All
      </button>
    </div>
  );
}

export default Todoactions;