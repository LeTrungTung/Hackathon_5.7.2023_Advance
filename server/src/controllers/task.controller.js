//Import Modal

const taskModel = require("../models/task.model");

const getAllTask = (req, res) => {
  // do something
  taskModel.modelGetAllTask(res);
};
const getTaskById = (req, res) => {
  // do something
  const id = req.params.id;
  taskModel.modelGetTaskById(id, res);
};

const postTask = (req, res) => {
  if (!req.body) return;
  const newTask = ({ content, due_date, status_col, assigned_to } =
    req.body);
  taskModel.modelPostTask(newTask, res);
};

const deleteTask = (req, res) => {
  // do something
  const id = req.params.id;
  taskModel.modelDeleteTask(id, res);
};

module.exports = {
  getAllTask,
  getTaskById,
  postTask,
  deleteTask,
};
