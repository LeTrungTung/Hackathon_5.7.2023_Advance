const express = require("express");
const route = express.Router();
const taskController = require("../controllers/task.controller");

// controller

route.get("/", taskController.getAllTask);

route.get("/:id", taskController.getTaskById);

// // // route.patch("/:id", userController.editUser);
route.post("/", taskController.postTask);
route.delete("/:id", taskController.deleteTask);

module.exports = route;
