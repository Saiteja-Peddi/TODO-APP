const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const { connectToDB } = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// dotenv is used to access variables in .env file.
// In this case we are storing values that we don't want to push to the cloud repo.
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

// Routes
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = 3000;

/*
1. First we connect to the db.
2. This is because there is no use in running server if db connection fails.
3. Since mongoose.connect return promise we can implement in below format.
4. If db connection is successful, server starts listening.
5. If db connection fails, it logs the error.
*/

const startBackendServer = async () => {
  try {
    await connectToDB(process.env.MONGO_URI_TODO_APP);
    app.listen(port, console.log(`Server Listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startBackendServer();
