import type { DataBroker } from "../data/brokers";
import { BROKER_CATEGORIES } from "../data/brokers";
import type { BrokerStatus } from "../hooks/useBrokerStatus";

interface BrokerCardProps {
  broker: DataBroker;
  status: BrokerStatus;
  onStatusChange: (brokerId: string, status: BrokerStatus) => void;
}

const BADGE_LABELS: Record<string, string> = {
  phone: "Phone verification",
  id: "ID required",
  paid: "May charge",
  "ca-only": "CA residents only",
};

export function BrokerCard({ broker, status, onStatusChange }: BrokerCardProps) {
  const handleMarkSubmitted = () => {
    onStatusChange(broker.id, "submitted");
  };

  const handleMarkRemoved = () => {
    onStatusChange(broker.id, "removed");
  };

  const handleClearStatus = () => {
    onStatusChange(broker.id, "none");
  };

  return (
    <article className="broker-card">
      <div className="broker-card-header">
        <div className="broker-title-row">
          <h3 className="broker-name">{broker.name}</h3>
          <span className="broker-category">{BROKER_CATEGORIES[broker.category]}</span>
        </div>
        <div className="broker-badges">
          {broker.priority === "crucial" && (
            <span className="badge badge-crucial">Priority</span>
          )}
          {broker.priority === "high" && (
            <span className="badge badge-high">High</span>
          )}
          {broker.badges?.map((badge) => (
            <span key={badge} className="badge badge-info">
              {BADGE_LABELS[badge] ?? badge}
            </span>
          ))}
        </div>
      </div>

      <div className="broker-card-actions">
        <a
          href={broker.optOutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Request Removal
        </a>
        {broker.searchUrl && (
          <a
            href={broker.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Search First
          </a>
        )}
      </div>

      <div className="broker-card-status">
        <span className="status-label">Track:</span>
        {status === "none" && (
          <>
            <button
              type="button"
              className="btn-ghost"
              onClick={handleMarkSubmitted}
            >
              Submitted
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={handleMarkRemoved}
            >
              Removed
            </button>
          </>
        )}
        {status === "submitted" && (
          <>
            <span className="status-badge status-submitted">Submitted</span>
            <button type="button" className="btn-ghost" onClick={handleClearStatus}>
              Clear
            </button>
          </>
        )}
        {status === "removed" && (
          <>
            <span className="status-badge status-removed">Removed</span>
            <button type="button" className="btn-ghost" onClick={handleClearStatus}>
              Clear
            </button>
          </>
        )}
      </div>
    </article>
  );
}
