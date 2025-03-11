const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  deleteTodo,
} = require("../controllers/toDoController");

router.route("/").get(getAllTodos);
router.route("/add").post(createTodo);
router.route("/delete/:id").delete(deleteTodo);

module.exports = router;
