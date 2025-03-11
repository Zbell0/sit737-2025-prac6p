const express = require("express");
const router = express.Router();
const { getAllTodos, createTodo } = require("../controllers/toDoController");

router.route("/").get(getAllTodos).post(createTodo);

module.exports = router;
