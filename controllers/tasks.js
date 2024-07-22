const asyncWrapper = require("../middlewares/async");
const Task = require("../models/TasksSchema");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).send({ status: 200, data: tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const newTask = await Task.create({ name });
  res.status(201).send({ status: "success", data: newTask });
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.send({ status: "fail", error: "this task doesn't exist" });
  }
  res.status(200).send({ status: "success", data: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return res.send({ status: "fail", error: "this task doesn't exist" });
  }
  res.status(200).send({ status: "success", data: task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  if (!task) {
    return res.send({ status: "fail", error: "this task doesn't exist" });
  }
  res.status(200).send({ status: "success", data: task });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  deleteTask,
  updateTask,
};
