import Task from "./Components/Task";
import TaskInput from "./Components/TaskInput";
import "./App.css";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Title 1",
      isFinished: false,
    },
    {
      id: "2",
      title: "Title 2",
      isFinished: false,
    },
  ]);

  const addTask = (title) => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: title,
        isFinished: false,
      },
    ]);
  };
  const setTaskFinished = (id, value) => {
    console.log(value);
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, isFinished: value } : task
      )
    );
  };

  const [finishedTasksVisible, setFinishedTasksVisible] = useState(false);
  const visibleTasks = tasks.filter((task) => {
    if (!finishedTasksVisible && task.isFinished) {
      return false;
    }

    return true;
  });

  const removeTask = (id) => {
    console.log("removing task" + id);
    setTasks(tasks.filter((e) => e.id != id));
  };

  return (
    <main>
      <button onClick={() => setFinishedTasksVisible(!finishedTasksVisible)}>
        {finishedTasksVisible ? "Hide Finished Tasks" : "Show Finished Tasks"}
      </button>
      {visibleTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isFinished={task.isFinished}
          setFinished={(value) => setTaskFinished(task.id, value)}
          onRemove={() => removeTask(task.id)}
        />
      ))}
      <TaskInput onInput={addTask} />
    </main>
  );
}

export default App;
