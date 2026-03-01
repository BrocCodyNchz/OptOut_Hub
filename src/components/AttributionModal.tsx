interface AttributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOURCES = [
  {
    name: "Big Ass Data Broker Opt-Out List (BADBOOL)",
    author: "Yael Grauer",
    url: "https://github.com/yaelwrites/Big-Ass-Data-Broker-Opt-Out-List",
    description: "Community-maintained list since 2017 with priority rankings and opt-out instructions.",
  },
  {
    name: "Optery Data Brokers Directory",
    author: "Optery",
    url: "https://github.com/optery/optery-data-brokers-directory",
    description: "Open-source directory of 646+ data brokers with opt-out links and guides.",
  },
  {
    name: "State of Surveillance",
    url: "https://stateofsurveillance.org/guides/advanced/people-search-master-list/",
    description: "75+ sites with direct opt-out links and step-by-step guides.",
  },
  {
    name: "Privacy Rights Clearinghouse",
    url: "https://www.privacyrights.org/data-brokers",
    description: "Advocate-maintained data broker database and privacy resources.",
  },
  {
    name: "California CPPA Data Broker Registry",
    url: "https://cppa.ca.gov/data_broker_registry/",
    description: "Official registry of data brokers registered in California.",
  },
];

export function AttributionModal({ isOpen, onClose }: AttributionModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="attribution-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="attribution-title"
    >
      <div
        className="attribution-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="attribution-header">
          <h2 id="attribution-title">Sources & Attribution</h2>
          <button
            type="button"
            className="attribution-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="attribution-content">
          <p>
            OptOut Hub aggregates and verifies opt-out links from the following
            trusted sources. We give full credit to these projects and
            organizations.
          </p>
          <ul className="attribution-list">
            {SOURCES.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attribution-link"
                >
                  {source.name}
                </a>
                {"author" in source && (
                  <span className="attribution-author"> by {source.author}</span>
                )}
                <p className="attribution-desc">{source.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
