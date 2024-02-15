const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "tasks" }
);

/**
 * The first argument is the singular name of the collection your model is for.
 * Mongoose automatically looks for the plural, lowercased version of your model name.
 * Thus, for the example below, the model Task is for the tasks collection in the database.
 * To remove the default pluralization use collection in schema.
 */
module.exports = mongoose.model("Task", TaskSchema);
