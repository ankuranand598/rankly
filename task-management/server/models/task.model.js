const mongoose = require("mongoose");

const statusEnum=["To Do", "In Progress","Done"];

const taskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status:{
            enum: statusEnum
        },
        duedate: Date
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;