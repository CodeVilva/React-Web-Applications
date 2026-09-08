export default function TodoStats({ todos = [] }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const remaining = total - completed;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-num">{total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat">
        <div className="stat-num">{remaining}</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat">
        <div className="stat-num">{completed}</div>
        <div className="stat-label">Done</div>
      </div>
      <div className="progress-bar" aria-hidden>
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">{progress}%</div>
    </div>
  );
}