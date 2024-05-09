const express = require("express")
const Todo = require("../models/todo")
const Project = require("../models/project")

const router = express.Router()

//get the individual project todo detail
router.get("/add/:projectId",async (req,res)=>{
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId)
    return res.render("createTodo",{
        user:req.user,
        project:project
    })

})
//add the todo to the particular project individually
router.post("/add/:projectId", async (req, res) => {
    try {
        const todoData = req.body;
        const userId = req.user.id; // Assuming this contains the user ID
        const projectId = req.params.projectId
       
    
        const newTodo = new Todo(todoData);
        const savedTodo = await newTodo.save();
        // console.log("created todo",newTdod,"and the result is ",saveTodo)
        if (!savedTodo) {
            return res.status(400).json({ msg: "Feilds are required !!" });
        }

        // Find the project associated with the user
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        // Ensure the createdBy field is properly set to the user's ID
        if (project.createdBy.toString() !== userId) {
            return res.status(403).json({ msg: "User is not authorized to update this project" });
        }

        // Push the new todo into the project's Todos array
        project.Todos.push(savedTodo);
        await project.save();

        return res.redirect(`/project/${req.params.projectId}`)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server error !!!" });
    }
});

//update the status of the todo
router.patch("/add/status/:todoId",async (req,res)=>{
    try{
       const todoId = req.params.todoId;
       const todoDetails = await Todo.findByIdAndUpdate(todoId, { status: "Completed" }, { new: true });

       if(!todoDetails){
        return res.status(404).json({msg:"Todo list is not found !!"})
       }
       return res.status(200).json(todoDetails)
    }
    catch(error){
       console.log(error)
       return res.status(500).json({msg:"Internal Server error"})
    }
})
router.patch("/add/:todoId",async (req,res)=>{
    try{
       const todoId = req.params.todoId;
       const todoContent = req.body;
       const todoDetails = await Todo.findByIdAndUpdate(todoId, todoContent);

       if(!todoDetails){
        return res.status(404).json({msg:"Todo list is not found !!"})
       }
       return res.status(200).json(todoDetails)
    }

    catch(error){
       console.log(error)
       return res.status(500).json({msg:"Internal Server error"})
    }
})
router.delete("/delete/:projectId/:todoId",async (req,res)=>{
    try{
      const todoId = req.params.todoId;
      const projectId = req.params.projectId
      const projectDetail  =  await Project.findById(projectId)  

      projectDetail.Todos.pull(todoId)
      const todoData = await Todo.findById(todoId)
      const response = await Todo.findByIdAndDelete(todoId)
       
      if(!response)
        return res.status(400).json({msg:"Todo is not present"})

    //   projectDetail.Todos.pull(todoId)
      await projectDetail.save()
    
    // return res.status(200).json({msg:"Deleted Successfully !!!"})
    return res.redirect("/")
    }    
    catch(error){
      console.log(error)
      return res.status(500).json({msg:"Internal Server Error"})
    }
})
router.get("/delete/:projectId/:todoId",async (req,res)=>{
    try{
      const todoId = req.params.todoId;
      const projectId = req.params.projectId
      const projectDetail  =  await Project.findById(projectId)  

      projectDetail.Todos.pull(todoId)
      const todoData = await Todo.findById(todoId)
      const response = await Todo.findByIdAndDelete(todoId)
       
      if(!response)
        return res.status(400).json({msg:"Todo is not present"})

    //   projectDetail.Todos.pull(todoId)
      await projectDetail.save()
    
    // return res.status(200).json({msg:"Deleted Successfully !!!"})
    return res.redirect(`/project/${projectId}`)
    }    
    catch(error){
      console.log(error)
      return res.status(500).json({msg:"Internal Server Error"})
    }
})

router.post("/update/:projectId/:todoId",async (req,res)=>{
    try{
       const projectId = req.params.projectId;
       const todoId = req.params.todoId;
       const todoContent = req.body;
       const project = await Project.findById(projectId)

       if(!project){
        return res.status(404).json({msg:"Project  is not valid"})
       }
       const response = await Todo.findByIdAndUpdate(todoId,todoContent,{
        new:true,
       })
       if(!response){
        return res.status(404).json({msg:"todo is not found !!!"})
       }
       return res.redirect(`/project/${projectId}`)

    }
    catch(error){
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"})
    }
})

router.get("/update/:projectId/:todoId",async (req,res)=>{
    const projectId = req.params.projectId;
    const todoId = req.params.todoId
    const todoData = await Todo.findById(todoId)

    if(!todoData){
        return res.status(400).json({msg:"Todo is not there !!!"})
    }
    return res.render("updateTodo",{
        user:req.user,
        project:projectId,
        todo:todoData
    })
})
// to get the data of the individual todo
router.get("/:todoId",async(req,res)=>{
    try{
       const todoId = req.params.todoId;
       const todoData = await Todo.findById(todoId)

       if(!todoData){
        return res.status(400).json({msg:"Todo is not present with this id"})
       }
       return res.status(200).json(todoData);
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg:"Internal server error"})
    }
})
module.exports = router