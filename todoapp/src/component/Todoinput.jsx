import { useContext, useState } from "react";
import { TodoContext } from "../App";

function Todoinput() {

  const { dispatch } = useContext(TodoContext);

  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
   if (inputValue.trim()){
        dispatch({
            type: "add",
            payload: {
              id: Date.now(),
              text: inputValue,
              completed: false,
              important: false
            }
          })
        }
      setInputValue("");
  }
  const hanldeSubmit = (e) => {
  
    if (e.key === "Enter" && inputValue.trim() !== "") {
      dispatch({
        type: "add",
        payload: {
          id: Date.now(),
          text: inputValue,
          completed: false,
          important: false
        }
      });
      
      setInputValue("");
    }
  };

  return (
    <div className="input-group">
      <input
        className="task-input"
        type="text"
        name="task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={hanldeSubmit}
        placeholder="Type a task and press Enter..."
      />
      <button
        className="add-btn"
        onClick={handleAdd}
      >
        ADD
      </button>
    </div>
  );
}

export default Todoinput;