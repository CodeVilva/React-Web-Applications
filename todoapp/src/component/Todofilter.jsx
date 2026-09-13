import { useContext } from "react";
import { TodoContext } from "../App";

function Todofilter() {

  const { filter, dispatch } = useContext(TodoContext);

  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Important", value: "important" },
  ];

  return (
    <div className="filter-group">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          className={"filter-btn" + (filter === f.value ? " active" : "")}
          onClick={() => dispatch({ type: "setFilter", payload: f.value })}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default Todofilter;
