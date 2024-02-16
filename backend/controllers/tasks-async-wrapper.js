/**
 * In this we use async wrapper.
 * It means instead of using multiple try catch blocks we simply implement it using async middleware.
 * Error handler middleware handles the errors.
 */

const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomApiError } = require("../errors/custom-error");

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({
    success: true,
    message: "Task created successfully",
    task: task,
  });
});

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ deleted: false });
  res.status(200).json({ success: true, tasks: tasks });
});

const getTaskByID = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    // Example to use custom error handling
    return next(
      createCustomApiError(
        400,
        JSON.stringify({
          success: false,
          message: "Task not found.",
        })
      )
    );
  }
  res.status(200).json({ success: true, task: task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!task) {
    return res.status(400).json({ success: false, message: "Task not found." });
  }
  res.status(200).json({ success: true, message: "Updated task", task: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOneAndUpdate(
    { _id: id },
    { deleted: true },
    { new: true }
  );
  if (!task) {
    return res.status(400).json({ success: false, message: "Task not found." });
  }
  res.status(200).json({ success: true, message: "Deleted task", task: task });
});

// Example for deleting records permanently in db.
const removeDeletedTasks = asyncWrapper(async (req, res) => {
  const noOfDeletedTasks = await Task.deleteMany({ deleted: true });
  if (!noOfDeletedTasks.deletedCount) {
    return res.status(200).json({ success: true, message: "No tasks found" });
  }
  res.status(200).json({
    success: true,
    message: "Permanently deleted tasks",
    count: noOfDeletedTasks,
  });
});

module.exports = {
  getAllTasks,
  getTaskByID,
  createTask,
  updateTask,
  deleteTask,
  removeDeletedTasks,
};
