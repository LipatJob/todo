/* eslint-disable no-case-declarations */
export default (tasks = [], action) => {
  switch (action.type) {
    case TaskActions.Add:
      const newTask = {
        id: crypto.randomUUID(),
        title: action.title,
        isFinished: false,
        parent: action.parent,
      };
      return [...tasks, newTask];
    case TaskActions.Delete:
      return tasks.filter(
        (task) => !(task.id == action.id || task.parent == action.id)
      );
    case TaskActions.EditTitle:
      return tasks.map((task) =>
        task.id == action.id ? { ...task, title: action.title } : task
      );
    case TaskActions.Toggle:
      return tasks.map((task) =>
        task.id == action.id ? { ...task, isFinished: action.value } : task
      );
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
};

export const TaskActions = {
  Add: "Add",
  Delete: "Delete",
  EditTitle: "EditTitle",
  Toggle: "Toggle",
};

export const getTaskHierarchy = (tasks) =>
  Object.values(
    tasks
      .map((task, index) => ({ ...task, index, subtasks: [] }))
      .reduce((acc, task) => {
        const isSubtask = task.parent !== null;
        if (isSubtask) {
          acc[task.parent].subtasks.push(task);
        } else {
          acc[task.id] = task;
        }
        return acc;
      }, {})
  ).sort((task) => task.index);

Object.freeze(TaskActions);
