export default function Task({ id, title, isDone, onRemove }) {
  return (
    <div>
      <input type="checkbox" /> {title}
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(id);
        }}
      >
        Remove
      </button>
    </div>
  );
}
