import { useState } from "react";

export default function TaskInput({ onInput }) {
  const [text, setText] = useState("");
  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)}></input>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onInput(text);
        }}
      >
        Create Task
      </button>
    </div>
  );
}
