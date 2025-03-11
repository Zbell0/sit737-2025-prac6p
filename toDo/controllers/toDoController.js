const asyncHandler = require("express-async-handler");
const ToDo = require("../models/toDoModel.js");

// Get all contacts
// GET /contacts
const getAllTodos = asyncHandler(async (req, res) => {
  const toDo = await ToDo.find();
  //   res.render("index", { contacts: contacts });
  res.send("get all todos");
});

const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const toDo = await ToDo.create({ title });
    res.status(201).json(toDo); // 생성된 데이터 응답
  } catch (error) {
    res.status(500).json({ message: "Failed to create ToDo" });
    console.log(error);
  }
});

module.exports = {
  getAllTodos,
  createTodo,
};
