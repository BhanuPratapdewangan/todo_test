import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";

import './db/config.js';
import todoModel from './db/todoList.js';
import userModel from './db/user.js';

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT | 2200;

const ObjectId = mongoose.Types.ObjectId;


// Signup API's
app.post("/signup", async (req, res) => {

    let data = new userModel(req.body);
    data = await data.save();
    data = data.toObject();
    delete data.password;
    res.send(data);
})

// Login API's
app.post("/login", async (req, res) => {

    try {
        if (req.body.email && req.body.password) {
            let data = await userModel.findOne(req.body).select('-password');
            if (data) {
                res.send(data);
            } else {
                res.send("result: Data not found");
            }
        } else {
            res.send("result: Data not found");
        }
    } catch (error) {
        console.error(error);
    }
})


// Add Product API's
app.post("/addTodo", async (req, res) => {

    try {
        let data = new todoModel(req.body);
        let result = await data.save();
        res.send(result);
    } catch (error) {
        console.error(error);
    }
})

app.get('/todoList', async (req, res) => {

    try {
        let data = await todoModel.find();

        if (data.length > 0) {
            res.send(data);
        } else {
            res.send({ data: "Data not found" });
        }
    } catch (error) {
        console.error(error);
    }
})


app.delete('/deleteTodo/:id', async (req, res) => {
    const id = req.params.id;
    // res.send("Delete API's is working");

    if (mongoose.Types.ObjectId.isValid(id)) {

        try {
            let result = await todoModel.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        res.status(400).json({ error: 'Invalid ObjectId' });
    }

})


app.get('/gettodo/:id', async (req, res) => {

    var Id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(Id)) {
        try {
            let result = await todoModel.findOne({ id: new ObjectId(Id) })
            if (result) {
                res.send(result);
            } else {
                res.send({ result: "Data not found" });
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        res.status(400).json({ error: 'Invalid ObjectId' });
    }

})

app.put('/updatetodo/:id', async (req, res) => {

    const id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            let result = await todoModel.updateOne({ _id: new ObjectId(id) }, { $set: req.body })
            res.send(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        res.status(400).json({ error: 'Invalid ObjectId' });
    }

})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});