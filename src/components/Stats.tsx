import type { StatusMap } from "../hooks/useBrokerStatus";
import { BROKERS } from "../data/brokers";

interface StatsProps {
  statusMap: StatusMap;
}

export function Stats({ statusMap }: StatsProps) {
  const total = BROKERS.length;
  const submitted = Object.values(statusMap).filter((s) => s === "submitted").length;
  const removed = Object.values(statusMap).filter((s) => s === "removed").length;
  const pending = total - submitted - removed;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total Brokers</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{pending}</span>
        <span className="stat-label">Pending</span>
      </div>
      <div className="stat-card stat-submitted">
        <span className="stat-value">{submitted}</span>
        <span className="stat-label">Submitted</span>
      </div>
      <div className="stat-card stat-removed">
        <span className="stat-value">{removed}</span>
        <span className="stat-label">Removed</span>
      </div>
    </div>
  );
}
