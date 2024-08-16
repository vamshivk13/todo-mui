export const getCompletedTasks = (tasks) => {
  return tasks
    .filter((task) => task.isDone == true)
    .sort((taska, taskb) => taskb.doneAt - taska.doneAt);
};
export const getTodoTasks = (tasks) => {
  return tasks
    .filter((task) => task.isDone == false)
    .sort((taska, taskb) => taskb.createdAt - taska.createdAt);
};
