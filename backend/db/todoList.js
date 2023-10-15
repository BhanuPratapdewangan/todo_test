
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    id:Number,
    title:String,
    completed:Boolean
});

let todoModel = mongoose.model('tblproducts', todoSchema);

export default todoModel;