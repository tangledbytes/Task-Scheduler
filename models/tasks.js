let mongoose = require('mongoose');

// Schema

var taskSchema = new mongoose.Schema({
    user: String,
    task: String
});

var Task = module.exports = mongoose.model("Task", taskSchema);