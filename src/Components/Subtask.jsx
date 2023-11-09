export default function Subtask({ title, onRemove, onEditTitle }) {
  return (
    <div className="flex flex-row">
      <input
        type="text"
        name=""
        id=""
        value={title}
        onChange={(e) => onEditTitle(e.target.value)}
      />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}
