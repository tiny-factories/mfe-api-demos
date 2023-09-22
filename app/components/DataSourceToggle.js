function DataSourceToggle({ sources, onSourceChange }) {
  return (
    <div className="p-4 space-y-2">
      {sources.map((source) => (
        <button
          key={source}
          onClick={() => onSourceChange(source)}
          className="btn btn-primary"
        >
          {source}
        </button>
      ))}
    </div>
  );
}

export default DataSourceToggle;
