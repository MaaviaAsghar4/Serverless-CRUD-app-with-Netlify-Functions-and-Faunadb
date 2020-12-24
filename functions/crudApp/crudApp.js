const addTodo = require("./todos/addTodo.js");
const getTodos = require("./todos/getTodos.js");
const updateTodo = require("./todos/updateTodo.js");
const deleteTodo = require("./todos/deleteTodo.js");
const errorString = require("./todos/errorString.js");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getTodos(event);
  } else if (event.httpMethod === "POST") {
    return await addTodo(event);
  } else if (event.httpMethod === "PUT") {
    return await updateTodo(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteTodo(event);
  } else {
    return errorString(405, { msg: "Method not Applicable" });
  }
};
