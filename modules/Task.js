const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

taskTitle:String,
description:String,
week:String,
createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Task",TaskSchema);