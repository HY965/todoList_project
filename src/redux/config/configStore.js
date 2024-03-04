import { combineReducers } from "redux";
import todo from "../modules/todoSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  todo,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
