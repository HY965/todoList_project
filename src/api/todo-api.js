import axios from "axios";

export const todoClient = axios.create({
  baseURL: "http://localhost:5000/todos",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = async () => {
  const { data } = await todoClient.get("/");
  return data;
};

export const getSingleTodo = async (id) => {
  const { data } = await todoClient.get(`/${id}`);
  return data;
};

export const addTodo = async (todo) => {
  await todoClient.post("/", todo);
  return todo;
};

export const deleteTodo = async (id) => {
  await todoClient.delete(`/${id}`);
  return id;
};

export const checkTodo = async (id, todo) => {
  await todoClient.patch(`/${id}`, todo);
  return id;
};
