/* eslint-disable no-case-declarations */
export default (tasks = [], action) => {
  const isSubtask = action.parent !== null;
  switch (action.type) {
    case TaskActions.Add:
      const newTask = {
        id: crypto.randomUUID(),
        title: action.title,
        isFinished: false,
        subtasks: [],
        isSubtask: isSubtask,
      };
      return isSubtask
        ? addSubtask(tasks, action.parent, newTask)
        : addRootTask(tasks, newTask);
    case TaskActions.Delete:
      return isSubtask
        ? deleteSubTask(tasks, action.id, action.parent)
        : deleteRootTask(tasks, action.id);
    case TaskActions.EditTitle:
      return isSubtask
        ? editSubTaskTitle(tasks, action.id, action.parent, action.title)
        : editRootTaskTitle(tasks, action.id, action.title);
    case TaskActions.Toggle:
      return isSubtask
        ? toggleSubTask(tasks, action.id, action.value, action.parent)
        : toggleRootTask(tasks, action.id, action.value);
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
};
function addRootTask(tasks, newTask) {
  return [...tasks, newTask];
}

function addSubtask(tasks, parentId, newTask) {
  return tasks.map((task) =>
    task.id === parentId
      ? { ...task, subtasks: [...task.subtasks, newTask] }
      : { ...task }
  );
}

function deleteRootTask(tasks, id) {
  return tasks.filter((task) => task.id != id);
}

function deleteSubTask(tasks, id, parentId) {
  return filterSubTask(tasks, id, parentId, (subtask) => subtask.id !== id);
}

function editRootTaskTitle(tasks, id, title) {
  console.log(title);
  return tasks.map((task) => (task.id === id ? { ...task, title } : task));
}

function editSubTaskTitle(tasks, id, parentId, title) {
  return mapSubTask(tasks, id, parentId, (subtask) =>
    subtask.id == id ? { ...subtask, title } : subtask
  );
}

function toggleRootTask(tasks, id, value) {
  console.log(value);
  return tasks.map((task) =>
    task.id === id ? { ...task, isFinished: value } : task
  );
}

function toggleSubTask(tasks, id, value, parentId) {
  return mapSubTask(tasks, id, parentId, (subtask) =>
    subtask.id == id ? { ...subtask, isFinished: value } : subtask
  );
}

function filterSubTask(tasks, id, parentId, filter) {
  return tasks.map((task) =>
    task.id === parentId
      ? {
          ...task,
          subtasks: task.subtasks.filter(filter),
        }
      : task
  );
}

function mapSubTask(tasks, id, parentId, mapper) {
  return tasks.map((task) =>
    task.id === parentId
      ? {
          ...task,
          subtasks: task.subtasks.map(mapper),
        }
      : task
  );
}

// how to copy tree
// traversal
// mapTree
// filterTree

export const TaskActions = {
  Add: "Add",
  Delete: "Delete",
  EditTitle: "EditTitle",
  Toggle: "Toggle",
};

Object.freeze(TaskActions);
