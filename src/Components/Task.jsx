import Subtask from "./Subtask";

export default function Task({
  title,
  subtasks,
  isFinished,
  setFinished,
  onRemove,
  onAddSubtask,
  onRemoveSubtask,
  onEditSubtaskTitle,
}) {
  return (
    <div>
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
        <button onClick={onAddSubtask}>Add Subtask</button>
      </div>
      <div>
        {subtasks.map((subtask) => (
          <Subtask
            key={subtask.id}
            id={subtask.id}
            title={subtask.title}
            onRemove={() => onRemoveSubtask(subtask.id)}
            onEditTitle={(newTitle) => onEditSubtaskTitle(subtask.id, newTitle)}
          />
        ))}
      </div>
    </div>
  );
}
