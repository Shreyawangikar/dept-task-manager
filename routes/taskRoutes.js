const express = require("express");
const router = express.Router();
const Task = require("../modules/Task");


// CREATE TASK (Department only)
router.post("/task", async (req,res)=>{

if(req.body.role !== "dept"){
return res.json({message:"Access Denied"})
}

const task = new Task({
taskTitle:req.body.taskTitle,
description:req.body.description,
week:req.body.week
})

await task.save()

res.json({message:"Task Created"})

})


// READ TASKS (Everyone)
router.get("/tasks", async (req,res)=>{

const tasks = await Task.find()

res.json(tasks)

})


// UPDATE TASK (Department only)
router.put("/task/:id", async (req,res)=>{

if(req.body.role !== "dept"){
return res.json({message:"Access Denied"})
}

await Task.findByIdAndUpdate(req.params.id,{
taskTitle:req.body.taskTitle,
description:req.body.description,
week:req.body.week
})

res.json({message:"Task Updated"})

})


// DELETE TASK (Department only)
router.delete("/task/:id", async (req,res)=>{

if(req.body.role !== "dept"){
return res.json({message:"Access Denied"})
}

await Task.findByIdAndDelete(req.params.id)

res.json({message:"Task Deleted"})

})

module.exports = router