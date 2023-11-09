import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
export default function Task({
  title,
  isFinished,
  isSubtask,
  onAddSubtask,
  onRemove,
  onEditTitle,
  onToggle,
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {!isSubtask && (
        <button className="btn btn-ghost p-2" onClick={onAddSubtask}>
          <MdOutlineSubdirectoryArrowRight height={8} width={8} />
        </button>
      )}
      <input
        className="checkbox rounded-full"
        type="checkbox"
        checked={isFinished}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <input
        className={`input flex-grow ${isFinished ? "line-through" : ""}`}
        type="text"
        value={title}
        onChange={(e) => onEditTitle(e.target.value)}
      />
      <div className="ml-auto flex flex-row gap-2">
        <button
          className="btn btn-ghost rounded-full"
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
}
