import type { BrokerCategory } from "../data/brokers";
import { BROKER_CATEGORIES } from "../data/brokers";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: BrokerCategory | "all";
  onCategoryChange: (category: BrokerCategory | "all") => void;
  statusFilter: "all" | "submitted" | "removed" | "pending";
  onStatusChange: (status: "all" | "submitted" | "removed" | "pending") => void;
}

const CATEGORIES: (BrokerCategory | "all")[] = [
  "all",
  "people-search",
  "marketing",
  "credit",
  "facial",
  "property",
  "genealogy",
  "business",
  "search-engines",
  "direct-mail",
  "other",
];

export function FilterBar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Search brokers..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="filter-search"
        aria-label="Search data brokers"
      />
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value as BrokerCategory | "all")}
        className="filter-select"
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {(CATEGORIES.filter((c) => c !== "all") as BrokerCategory[]).map((cat) => (
          <option key={cat} value={cat}>
            {BROKER_CATEGORIES[cat]}
          </option>
        ))}
      </select>
      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(e.target.value as "all" | "submitted" | "removed" | "pending")
        }
        className="filter-select"
        aria-label="Filter by status"
      >
        <option value="all">All status</option>
        <option value="pending">Pending</option>
        <option value="submitted">Submitted</option>
        <option value="removed">Removed</option>
      </select>
    </div>
  );
}
