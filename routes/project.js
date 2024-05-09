const express = require("express")
const Project = require("../models/project")
const Todo = require("../models/todo")

const router = express.Router()
router.get("/createProject",(req,res)=>{
  return res.render("createProject",{
    user:req.user
  })
})

router.post("/createProject",async (req,res)=>{
    try{
      await Project.create({
        title:req.body.title,
        createdBy:req.user.id,
      })
      return res.redirect("/")
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg:"Internal Server Error !!"})
    }
})
//show all the project to the authenticated user
router.get("/",async (req,res)=>{
    try{
      const userId = req.user.id;
      const projectData = await Project.find({createdBy:userId})
      // const projectData = await Project.find({}).populate("createdBy") this approach is helpfull if we want to 
      //print the information related to the user on the web page
      if(!projectData)
         return res.status(404).json({msg:"No dats is found !!"})
      
      return res.render("allprojects",{
        user:req.user,
        projects:projectData
      })
    }
    catch(error){
      console.log(error)
      return res.status(500).json({msg:"Internal Sever error"})
    }
})
//to get the list of all the todos corresponding to the project id
router.get("/:projectId",async (req,res)=>{
  try{
     const projectId = req.params.projectId
     const projectDetail = await Project.findById(projectId)
     if(!projectDetail)
       return res.status(404).json({msg:"Project not found for the given id !!!"})

     const todoDetails = await Promise.all(projectDetail.Todos.map(async (todoId) => {
              const todo = await Todo.findById(todoId);
              return {
                 description:todo.description,
                 status:todo.status,
                 _id:todo._id
              }
                 
     }));
     //return the required result
     return res.render("projectDetail",{
      user:req.user,
      projects:projectDetail,
      todos:todoDetails,
     })
  }
  catch(error){
      console.log(error)
      return res.status(500).json({msg:"Internal Server Error !!"})
  }
})

module.exports = router
