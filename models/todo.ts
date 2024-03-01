const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const itemSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
});

const boardSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "To Do",
  },
  items: [itemSchema],
});

const dashboardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  boards: {
    toDo: boardSchema,
    inProgress: boardSchema,
    done: boardSchema,
  },
});

module.exports = model("Dashboard", dashboardSchema);
