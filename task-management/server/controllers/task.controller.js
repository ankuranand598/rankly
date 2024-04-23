const express = require("express");
const taskRouter = express.Router();
const Task = require("../models/task.model");

taskRouter.post("/tasks", async (req, res) => {
    const { title, description, status, duedate } = req.body;
    if (title && description && status && duedate) {
        try {
            const task = new Task({
                title, description, status, duedate
            })
            await task.save();
            res.status(200).send(task)
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
})


taskRouter.get("/tasks", async (req, res) => {
    try {
        const data = await Task.find()
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

taskRouter.get("/tasks/:id", async (req, res) => {
    let ID = req.params.id

    try {
        let data = await Task.find({ _id: ID })
        res.send(data)
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
})

taskRouter.put("/tasks/:id", async (req, res) => {
    let ID = req.params.id
    const { title, description, status, duedate } = req.body;

    try {
        const task = await Task.find({ _id: ID });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (duedate) task.duedate = duedate;

        await task.save();
        res.json("Task Updated Successfully");
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
})

taskRouter.delete("/tasks/:id", async (req, res) => {
    let ID = req.params.id

    try {
        await Task.findByIdAndDelete({ _id: ID })
        res.status(202).send({
            "msg": "Task has been deleted successfully"
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

module.exports = taskRouter;