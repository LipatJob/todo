import TaskInput from "./components/TaskInput";
import "./App.css";
import Task from "./Components/Task";
import TaskReducer, { TaskActions } from "./reducers/TaskReducer";
import { useReducer, useState } from "react";

function App() {
  const [tasks, dispatch] = useReducer(TaskReducer, []);
  const [finishedTasksVisible, setFinishedTasksVisible] = useState(false);
  const handleAdd = (title, parent = null) => {
    dispatch({ type: TaskActions.Add, title, parent });
  };
  const handleEditTitle = (id, newTitle, parent = null) => {
    dispatch({ type: TaskActions.EditTitle, id, title: newTitle, parent });
  };
  const handleDelete = (id, parent = null) => {
    dispatch({ type: TaskActions.Delete, id, parent });
  };
  const handleToggle = (id, value, parent = null) => {
    dispatch({ type: TaskActions.Toggle, id, value, parent });
  };

  return (
    <main className="mx-auto max-w-xl my-3">
      <div className="flex flex-row items-center">
        <h1 className="text-4xl">Tasks</h1>
        <button
          className="btn btn-primary ml-auto"
          onClick={() => setFinishedTasksVisible(!finishedTasksVisible)}
        >
          {finishedTasksVisible ? "Hide Finished Tasks" : "Show Finished Tasks"}
        </button>
      </div>

      <div className="flex flex-col gap-2 my-4">
        {tasks
          .filter((task) => (finishedTasksVisible ? task : !task.isFinished))
          .map((task) => (
            <div key={task.id} className="">
              <Task
                title={task.title}
                isFinished={task.isFinished}
                isSubtask={task.isSubtask}
                onEditTitle={(newTitle) => handleEditTitle(task.id, newTitle)}
                onRemove={() => handleDelete(task.id)}
                onAddSubtask={() => handleAdd("New subtask", task.id)}
                onToggle={(value) => handleToggle(task.id, value)}
              />
              <div className="flex flex-col ml-16 gap-1 mt-2">
                {task.subtasks
                  .filter((subtask) =>
                    finishedTasksVisible ? subtask : !subtask.isFinished
                  )
                  .map((subtask) => (
                    <Task
                      key={subtask.id}
                      title={subtask.title}
                      isFinished={subtask.isFinished}
                      isSubtask={subtask.isSubtask}
                      onEditTitle={(newTitle) =>
                        handleEditTitle(subtask.id, newTitle, task.id)
                      }
                      onToggle={(value) =>
                        handleToggle(subtask.id, value, task.id)
                      }
                      onRemove={() => handleDelete(subtask.id, task.id)}
                      setFinished={() => handleToggle(subtask.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
      <TaskInput onInput={handleAdd} />
    </main>
  );
}

export default App;
