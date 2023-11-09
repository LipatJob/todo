export default function Task({ title, isFinished, setFinished, onRemove }) {
  return (
    <div className="flex flex-row gap-2">
      <input
        type="checkbox"
        checked={isFinished}
        onChange={(e) => setFinished(e.target.checked)}
      />
      <p>{title}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
      >
        Remove
      </button>
    </div>
  );
}
