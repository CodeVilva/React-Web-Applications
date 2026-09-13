import { useContext } from "react";
import { TodoContext } from "../App";

function Todostats() {
  const { todos } = useContext(TodoContext);

  const totalTask = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  const pendingTask = todos.filter((t) => !t.completed).length;
  const progressRate = totalTask > 0 ? Math.round((completedTasks / totalTask) * 100) : 0;

  return (
    <div className="stats">
      <div className="stat-card">
        <div className="stat-value">{totalTask}</div>
        <div className="stat-label">Total Tasks</div>
      </div>

      <div className="stat-card">
        <div className="stat-value">{completedTasks}</div>
        <div className="stat-label">Completed</div>
      </div>

      <div className="stat-card">
        <div className="stat-value">{pendingTask}</div>
        <div className="stat-label">Pending</div>
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: `${progressRate}%` }} />
        </div>
      </div>
    </div>
  );
}

export default Todostats;