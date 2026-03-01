import { useState, useMemo } from "react";
import { BROKERS, BROKER_CATEGORIES, type BrokerCategory, type BrokerPriority } from "./data/brokers";
import { useBrokerStatus } from "./hooks/useBrokerStatus";
import { BrokerCard } from "./components/BrokerCard";
import { FilterBar } from "./components/FilterBar";
import { Stats } from "./components/Stats";
import { GettingStarted } from "./components/GettingStarted";
import { SiteInfo } from "./components/SiteInfo";
import { AttributionModal } from "./components/AttributionModal";
import { Legend } from "./components/Legend";
import "./App.css";

const PRIORITY_ORDER: Record<BrokerPriority, number> = {
  crucial: 0,
  high: 1,
  normal: 2,
};

function filterAndSortBrokers(
  brokers: typeof BROKERS,
  searchQuery: string,
  categoryFilter: BrokerCategory | "all",
  statusFilter: "all" | "submitted" | "removed" | "pending",
  getStatus: (id: string) => "none" | "submitted" | "removed"
) {
  const filtered = brokers.filter((broker) => {
    const matchesSearch =
      !searchQuery ||
      broker.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || broker.category === categoryFilter;
    const status = getStatus(broker.id);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && status === "none") ||
      (statusFilter === "submitted" && status === "submitted") ||
      (statusFilter === "removed" && status === "removed");
    return matchesSearch && matchesCategory && matchesStatus;
  });
  return [...filtered].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );
}

export default function App() {
  const { statusMap, setStatus, getStatus } = useBrokerStatus();
  const [showAttribution, setShowAttribution] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<BrokerCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "submitted" | "removed" | "pending"
  >("all");

  const filteredBrokers = useMemo(
    () =>
      filterAndSortBrokers(
        BROKERS,
        searchQuery,
        categoryFilter,
        statusFilter,
        getStatus
      ),
    [searchQuery, categoryFilter, statusFilter, statusMap]
  );

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">
          <h1 className="nav-title"><span className="nav-title-accent">OptOut</span> Hub</h1>
          <p className="nav-tagline">Remove your data from data brokers</p>
        </div>
        <button
          type="button"
          className="nav-attribution-btn"
          onClick={() => setShowAttribution(true)}
          aria-label="View sources and attribution"
        >
          Sources
        </button>
      </nav>
      <AttributionModal
        isOpen={showAttribution}
        onClose={() => setShowAttribution(false)}
      />

      <main className="main">
        <header className="hero">
          <h2 className="hero-title">Take Back Your Privacy</h2>
        </header>

        <SiteInfo />

        <GettingStarted />

        <Stats statusMap={statusMap} />

        <Legend />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="broker-list">
          {filteredBrokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
              status={getStatus(broker.id)}
              onStatusChange={setStatus}
            />
          ))}
        </div>

        {filteredBrokers.length === 0 && (
          <p className="empty-state">No brokers match your filters.</p>
        )}
      </main>
    </div>
  );
}
