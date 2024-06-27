const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
require("dotenv").config()
const app = express()
app.use(cors({
    origin:true,
    credentials:true
}))
app.use(express.json())
app.use("/api/admin",require("./routes/admin.routes"))
app.use("/api/auth",require("./routes/auth.routes"))
app.use("/api/public",require("./routes/public.routes"))
app.use("/api/user",require("./routes/user.routes"))
app.use("*",(req,res)=>{
    res.status(404).json({mesaage:"resource not found 404"})
})
app.use((err,req,res,next)=>{
    console.log(err,"server error");
    res.status(500).json({mesaage:"server Errror",error:err.mesaage
    })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open",()=>{
    console.log("mongo connected");
    app.listen(process.env.PORT,console.log("server runnning"))
})