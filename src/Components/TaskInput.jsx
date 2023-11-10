import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function TaskInput({ onInput }) {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-row gap-2">
      <input
        className="input input-bordered flex-grow"
        type="text"
        placeholder="Enter task title"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onInput(text);
          setText("");
        }}
      >
        <IoMdAdd color="white" />
      </button>
    </div>
  );
}
