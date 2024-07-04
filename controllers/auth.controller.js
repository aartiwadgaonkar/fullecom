const asyncHandler= require("express-async-handler")
const bcrypt=require("bcryptjs")
const Admin= require("../models/Admin")
const User= require("../models/User")
const jwt=require("jsonwebtoken")
exports.RegisterAdmin= asyncHandler( async (req, res)=>{
    const {name,email,password}=req.body
    const found=await Admin.findOne({email})
    if (found) {
        return res.status(401).json({message:"email already register with us "})
    }
    const hash=await bcrypt.hash(password,10)
  await Admin.create({name,email,password:hash})
})

exports.LoginAdmin= asyncHandler( async (req,res)=>{
    const {email,password}=req.body
    const found = await Admin.findOne({email})
    if (!found) {
        return res.status(401).json({message:"email not register with us "})

    }
    const verify =await bcrypt.compare(password,found.password)
    if (!verify) {
        return res.status(401).json({message:"password does not match "})

    }
    const token =jwt.sign({userId:found._id},process.env.JWT_KEY)
    res.cookie("admin",token,{httpOnly:true})
    res.json({message:"admin login success ",result:{
        _id:found._id,
        name:found.name,
        email:found.email
    }})
})

exports.LoginUser= asyncHandler( async (req, res)=>{
    const {email,password}=req.body
    const found = await User.findOne({email})
    if (!found) {
        return res.status(401).json({message:"email not register with us "})

    }
    const verify =await bcrypt.compare(password,found.password)
    if (!verify) {
        return res.status(401).json({message:"password does not match "})

    }
    if (!found.active) {
        return res.status(401).json({message:"account block by admin"})
    }
    const token =jwt.sign({userId:found._id},process.env.JWT_KEY)
    res.cookie("user",token,{httpOnly:true})
    res.json({message:"user login success ",result:{
        _id:found._id,
        name:found.name,
        email:found.email
    }})})
exports.RegisterUser= asyncHandler( async (req,res)=>{
    const {name,email,password}=req.body
    const found=await User.findOne({email})
    if (found) {
        return res.status(401).json({message:"email already register with us "})
    }
    const hash=await bcrypt.hash(password,10)
  await User.create({name,email,password:hash})
})
exports.logoutAdmin= asyncHandler( async (req,res)=>{
   res.clearCookie("admin")
   res.json({message:"admin logout success"})
})

