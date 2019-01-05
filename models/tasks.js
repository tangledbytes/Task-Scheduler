let mongoose = require('mongoose');

// Schema

var taskSchema = new mongoose.Schema({
    task: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
        name: String
    }
});

var Task = module.exports = mongoose.model("Task", taskSchema);