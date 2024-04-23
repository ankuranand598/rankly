const mongoose = require("mongoose");

// Connect to MongoDB
let db = mongoose.connect("mongodb+srv://prince:princesharma@cluster0.yzvjdke.mongodb.net/taskmanager?retryWrites=true&w=majority");
module.exports={db}