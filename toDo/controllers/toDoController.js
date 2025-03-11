const asyncHandler = require("express-async-handler");
const ToDo = require("../models/toDoModel.js");

// Get all contacts
// GET /contacts
const getAllTodos = asyncHandler(async (req, res) => {
  const toDos = await ToDo.find();
  res.render("index", { toDos: toDos });
});

const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const toDo = await ToDo.create({ title });
  res.redirect("/todos");
});

const deleteTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await ToDo.findByIdAndDelete(id);
  res.redirect("/todos");
});

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
};
