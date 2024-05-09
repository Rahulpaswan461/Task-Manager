const mongoose = require("mongoose")
const shortid = require('shortid');

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        defuault:Date.now()
    },
    Todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
},{timestamps:true})

const Project = mongoose.model("Project",projectSchema)

module.exports = Project