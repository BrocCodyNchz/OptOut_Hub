export function Legend() {
  return (
    <div className="legend">
      <span className="legend-label">Legend:</span>
      <div className="legend-items">
        <span className="legend-item">
          <span className="badge badge-crucial">Priority</span>
          <span className="legend-text">Start here—highest impact</span>
        </span>
        <span className="legend-item">
          <span className="badge badge-high">High</span>
          <span className="legend-text">Important—do these next</span>
        </span>
        <span className="legend-item">
          <span className="badge badge-info">Phone verification</span>
          <span className="legend-text">Requires phone call or SMS</span>
        </span>
        <span className="legend-item">
          <span className="badge badge-info">ID required</span>
          <span className="legend-text">May need to upload ID</span>
        </span>
        <span className="legend-item">
          <span className="badge badge-info">May charge</span>
          <span className="legend-text">Site may charge for removal</span>
        </span>
        <span className="legend-item">
          <span className="badge badge-info">CA residents only</span>
          <span className="legend-text">California residents only</span>
        </span>
      </div>
    </div>
  );
}
