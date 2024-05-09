require("dotenv").config()

const express = require("express")
const userRoute = require("./routes/user");
const { connectMongoDB } = require("./connection");
const {checkForAuthenticationCookie } = require("./middleware/authentication")
const cookieParser = require("cookie-parser")
const projectRoute = require("./routes/project")
const todoRoute = require("./routes/todo")
const path = require("node:path")

const app = express()
const PORT = process.env.PORT || 1240;

connectMongoDB(process.env.MONGO_URL)
.then(()=>console.log("MongoDB is connected"))
.catch(()=>console.log("There is some error"))


app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use("/user",userRoute)
app.use("/project",projectRoute)
app.use("/todo",todoRoute)

app.get("/",(req,res)=>{
    return res.render("home",{
        user:req.user
    })
})
app.listen(PORT,(req,res)=>{
    console.log("Server is running at 8000")
})