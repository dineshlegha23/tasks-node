const Task = require("../models/TasksSchema");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send({ status: 200, data: tasks });
  } catch (error) {
    res.status(500).send({ status: "fail", error });
  }
};

const createTask = async (req, res) => {
  try {
    const { name } = req.body;
    const newTask = await Task.create({ name });
    res.status(201).send({ status: "success", data: newTask });
  } catch (error) {
    res.status(500).send({ status: "fail", error });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.send({ status: "fail", error: "this task doesn't exist" });
    }
    res.status(200).send({ status: "success", data: task });
  } catch (error) {
    return res.status(500).send({ status: "fail", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.send({ status: "fail", error: "this task doesn't exist" });
    }
    res.status(200).send({ status: "success", data: task });
  } catch (error) {
    return res.status(500).send({ status: "fail", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
      return res.send({ status: "fail", error: "this task doesn't exist" });
    }
    res.status(200).send({ status: "success", data: task });
  } catch (error) {
    return res.status(500).send({ status: "fail", error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  deleteTask,
  updateTask,
};
