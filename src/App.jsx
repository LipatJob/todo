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
      subtasks: [],
    },
    {
      id: "2",
      title: "Title 2",
      isFinished: false,
      subtasks: [],
    },
  ]);

  const addTask = (title) => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: title,
        isFinished: false,
        subtasks: [],
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
    setTasks(tasks.filter((subtask) => subtask.id != id));
  };

  const addSubtask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            subtasks: [
              ...task.subtasks,
              { id: crypto.randomUUID(), title: "New subtask" },
            ],
          }
        : task
    );
    console.log(newTasks);
    setTasks(newTasks);
  };

  const deleteSubtask = (id, subtaskId) => {
    const newTasks = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            subtasks: task.subtasks.filter(
              (subtask) => subtask.id != subtaskId
            ),
          }
        : task
    );
    console.log(newTasks);
    setTasks(newTasks);
  };

  const editSubtaskTitle = (id, subtaskId, newTitle) => {
    const newTasks = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, title: newTitle }
                : subtask
            ),
          }
        : task
    );
    console.log(newTasks);
    setTasks(newTasks);
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
          subtasks={task.subtasks}
          isFinished={task.isFinished}
          setFinished={(value) => setTaskFinished(task.id, value)}
          onAddSubtask={() => addSubtask(task.id)}
          onRemove={() => removeTask(task.id)}
          onRemoveSubtask={(subtaskId) => deleteSubtask(task.id, subtaskId)}
          onEditSubtaskTitle={(subtaskId, title) =>
            editSubtaskTitle(task.id, subtaskId, title)
          }
        />
      ))}
      <TaskInput onInput={addTask} />
    </main>
  );
}

export default App;
