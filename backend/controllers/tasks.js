const getAllTasks = (req, res) => {
  response = { success: true, data: "getAllTasks" };
  res.status(200).json(response);
};

const getTask = (req, res) => {
  response = { success: true, data: "getTask" };
  res.status(200).json(response);
};

const createTask = (req, res) => {
  response = { success: true, data: "createTask" };
  res.status(200).json(response);
};

const updateTask = (req, res) => {
  response = { success: true, data: "updateTask" };
  res.status(200).json(response);
};

const deleteTask = (req, res) => {
  response = { success: true, data: "deleteTask" };
  res.status(200).json(response);
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
