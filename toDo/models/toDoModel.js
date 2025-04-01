const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// function changing schema into model
// mongoose.model(name of model,name of schema) --> to export the function as a module
const ToDo = mongoose.model("todo", toDoSchema);

module.exports = ToDo;
