import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getTodoTasks } from "../util/getTasks";

const todoReducer = createSlice({
  name: "todo",
  initialState: { tasks: [], todos: [], completed: [] },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    addTodo: (state, action) => {
      if (action.payload.isDone) {
        state.completed = [action.payload, ...state.completed];
      } else state.todos = [action.payload, ...state.todos];
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((curTask) => {
        if (curTask.id == action.payload.id) {
          return {
            ...curTask,
            ...action.payload.updatedTaskPayload,
          };
        } else return curTask;
      });
    },
    deleteTask: (state, action) => {
      const taskTobeDeleted = state.tasks.find(
        (task) => task.id == action.payload.id
      );
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      if (taskTobeDeleted.isDone) {
        state.completed = state.completed.filter(
          (task) => task.id !== action.payload.id
        );
      } else {
        state.todos = state.todos.filter(
          (task) => task.id !== action.payload.id
        );
      }
    },
    deleteTaskByList: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.listTypeId !== action.payload.id
      );
      state.todos = [];
      state.completed = [];
    },
    updateTaskByDate: (state, action) => {
      const date = new Date();
      state.tasks = state.tasks.map((task) => {
        const createdDate = new Date(task.createdAt).toDateString();
        if (createdDate != date.toDateString() && task.listTypeId == "MyDay") {
          return {
            ...task,
            listTypeId: "MyTasks",
          };
        } else return task;
      });
    },
    setTodos: (state, action) => {
      if (action.payload == "Important") {
        state.todos = state.tasks
          .filter((task) => task.isStarred == true && task.isDone == false)
          .sort((taska, taskb) => taskb.createdAt - taska.createdAt);
      } else
        state.todos = state.tasks
          .filter(
            (task) => task.isDone == false && task.listTypeId == action.payload
          )
          .sort((taska, taskb) => taskb.createdAt - taska.createdAt);
    },
    updateTodos: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id == action.payload.id) {
          return {
            ...todo,
            ...action.payload.updatedTaskPayload,
          };
        } else return todo;
      });
    },
    setCompleted: (state, action) => {
      if (action.payload == "Important") {
        console.log("IMP", state.tasks);
        state.completed = state.tasks
          .filter((task) => task.isStarred == true && task.isDone == true)
          .sort((taska, taskb) => taskb.doneAt - taska.doneAt);
        console.log("IMP", state.completed);
      } else
        state.completed = state.tasks
          .filter(
            (task) => task.isDone == true && task.listTypeId == action.payload
          )
          .sort((taska, taskb) => taskb.doneAt - taska.doneAt);
    },
    updateCompleted: (state, action) => {
      state.completed = state.completed.map((todo) => {
        if (todo.id == action.payload.id) {
          return {
            ...todo,
            ...action.payload.updatedTaskPayload,
          };
        } else return todo;
      });
    },
    deleteTodo: (state, action) => {
      if (action.payload.isDone) {
        const curTask = state.completed.find(
          (task) => task.id == action.payload.id
        );
        state.completed = state.completed.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.todos = [...state.todos, { ...curTask, isDone: false }].sort(
          (taska, taskb) => taskb.createdAt - taska.createdAt
        );
      } else {
        const curTask = state.todos.find(
          (task) => task.id == action.payload.id
        );
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.completed = [
          ...state.completed,
          { ...curTask, isDone: true, doneAt: action.payload.date },
        ].sort((taska, taskb) => taskb.doneAt - taska.doneAt);
      }
    },
    resetTodos: (state, action) => {
      state.todos = [];
      state.completed = [];
    },
    moveTodo: (state, action) => {
      if (action.payload.isDone) {
        state.completed = state.completed.filter(
          (todo) => todo.id !== action.payload.id
        );
      } else {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      }
    },
  },
});

const store = configureStore({
  reducer: {
    todo: todoReducer.reducer,
  },
});

export const todoReducerActions = todoReducer.actions;
export default store;
