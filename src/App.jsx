import Task from "./Task";
import TaskInput from "./TaskInput";
import "./App.css";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Title 1",
      isDone: false,
    },
    {
      id: "2",
      title: "Title 2",
      isDone: false,
    },
  ]);

  const addTask = (title) => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: title,
        isDone: false,
      },
    ]);
  };

  const removeTask = (id) => {
    console.log("removing task" + id);
    setTasks(tasks.filter((e) => e.id != id));
  };

  return (
    <main>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          onRemove={removeTask}
        />
      ))}
      <TaskInput onInput={addTask} />
    </main>
  );
}

export default App;
