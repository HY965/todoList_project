import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTodo, checkTodo, deleteTodo, getTodos } from "../../api/todo-api";

export const getTodosThunk = createAsyncThunk("list/getTodos", getTodos);
export const addTodoThunk = createAsyncThunk(
  "list/addTodo",
  "todo/createTodo",
  async (todo) => {
    await addTodo(todo);
    return todo;
  }
);
export const deleteTodoThunk = createAsyncThunk("list/deleteTodo", deleteTodo);
export const checkTodoThunk = createAsyncThunk("list/checkTodo", checkTodo);

export const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
  },
  reducers: {
    //로컬상태만 바꿔주는곳
    sortTodos: (state, action) => {
      const sortOrderTodos = action.payload;
      if (sortOrderTodos === "asc") {
        state.todos = state.todos.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
        return;
      }
      state.todos = state.todos.sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosThunk.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      state.todos.unshift(action.payload);
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      const targetIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(targetIndex, 1);
    });
    builder.addCase(checkTodoThunk.fulfilled, (state, action) => {
      const targetItem = state.todos.find((todo) => todo.id === action.payload);
      targetItem.isDone = !targetItem.isDone;
    });
  },
});

export const { sortTodos } = todoSlice.actions;
export default todoSlice.reducer;
