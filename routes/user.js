const express = require("express")
const User = require("../models/user")

const router = express.Router()

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.get("/signin",(req,res)=>{
    return res.render("signin")
})

router.post("/signup",async (req,res)=>{  
    try{
         const userData = req.body;
         const newUser = new User(userData)

         const response = await newUser.save();
         return res.redirect("/")
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg:"Internal server error"})
    }
})

router.post("/signin",async (req,res)=> {
    try{
         const {email,password } = req.body;
         if(!email || !password){
            return res.status(400).json({msg:"Fields are requier"})
         }
         const token = await User.matchPasswordAndGenerateToken(email,password)
         return res.cookie("token",token).redirect("/")
    }
    catch(error){
        console.log(error)
        return res.render("signin",{
            error:"Invalid Username or Password"
        })
    }
})

router.get('/logout',(req,res)=>{
     return res.clearCookie("token").redirect("/")
})
module.exports = router