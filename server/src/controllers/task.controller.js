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

const editTask = (req, res) => {
  // do something
  const id = Number(req.params.id);
  const taskUpdate = {
    content: req.body.content,
    due_date: req.body.due_date,
    status_col: req.body.status_col,
    assigned_to: req.body.assigned_to,
  };
  taskModel.modelEditTask(id, taskUpdate, res);
};

module.exports = {
  getAllTask,
  getTaskById,
  postTask,
  deleteTask,
  editTask,
};
