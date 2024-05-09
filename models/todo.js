const mongoose = require("mongoose")
const shortId = require("shortid")

const todoSchema = new mongoose.Schema({
     description:{
        type:String,
        required:true,
     },
     status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
     },
     createdAt:{
        type:Date,
        default:Date.now(),
     },
     updatedAt:{
        type:Date,
        default:Date.now()
     }
})

const Todo = mongoose.model("Todo",todoSchema)

module.exports = Todo