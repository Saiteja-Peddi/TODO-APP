const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskByID,
  createTask,
  updateTask,
  deleteTask,
  removeDeletedTasks,
} = require("../controllers/tasks-async-wrapper");

// Use "../controllers/tasks-async-wrapper" path above to test async-warapper functionality.
// Use "../controllers/tasks" path above to test normal functionality.

// Always define more specific routes before more general or parameterized routes to avoid conflicts.
router.route("/").get(getAllTasks).post(createTask);
router.route("/removeDeletedTasks").delete(removeDeletedTasks);
router.route("/:id").get(getTaskByID).delete(deleteTask).put(updateTask);

module.exports = router;
