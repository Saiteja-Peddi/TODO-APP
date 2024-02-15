const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res
      .status(200)
      .json({
        success: true,
        message: "Task created successfully",
        task: task,
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to create new task." });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ deleted: false });
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrieve all tasks" });
  }
};

const getTaskByID = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(200)
        .json({ success: true, message: "Task not found." });
    }
    res.status(200).json({ success: true, task: task });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrieve task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!task) {
      return res
        .status(200)
        .json({ success: true, message: "Task not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Updated task", task: task });
  } catch (error) {
    res.status(400).json({ success: false, message: "Unable to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { deleted: true },
      { new: true }
    );
    if (!task) {
      return res
        .status(200)
        .json({ success: true, message: "Task not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Deleted task", task: task });
  } catch (error) {
    res.status(400).json({ success: false, message: "Unable to delete task" });
  }
};

// Example for deleting records permanently in db.
const removeDeletedTasks = async (req, res) => {
  try {
    const noOfDeletedTasks = await Task.deleteMany({ deleted: true });
    if (!noOfDeletedTasks.deletedCount) {
      return res.status(200).json({ success: true, message: "No tasks found" });
    }
    res.status(200).json({
      success: true,
      message: "Permanently deleted tasks",
      count: noOfDeletedTasks,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to permanently delete tasks." });
  }
};

module.exports = {
  getAllTasks,
  getTaskByID,
  createTask,
  updateTask,
  deleteTask,
  removeDeletedTasks,
};
