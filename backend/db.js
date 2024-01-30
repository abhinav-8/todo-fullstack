const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


mongoose.connect(`${process.env.MONGO_URI}/todos`)
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todos',todoSchema);
module.exports = {
    todo
}