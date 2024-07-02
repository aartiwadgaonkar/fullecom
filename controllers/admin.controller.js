const asyncHandler= require("express-async-handler")
const Product=require("../models/Product");
const { upload } = require("../utils/upload");
const Order = require("../models/Order");
const cloudinary=require("cloudinary").v2
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

exports.getAllProducts= asyncHandler( async (req,res)=>{
    const result= await Product.find()
    res.json({message:"Product fetch Success",result})
})
exports.addProduct= asyncHandler( async (req,res)=>{
    upload(req,res,async (err)=>{
        if (err) {
          console.log(err);  
          return res.status(400).json({message:"upload error"})
        }
    const {secure_url}= await cloudinary.uploader.upload(req.file.path)
// console.log(req.file.path);
    const result= await Product.create({...req.body,images:secure_url})
        res.json({message:"Product add Success",result})
    })
})
exports.updateProduct= asyncHandler( async (req,res)=>{
    res.json({message:"Product upadate Success"})
})
exports.deleteProduct= asyncHandler( async (req,res)=>{
    const result = await Product.findById(req.params.id)
    const str =result.images.split("/")
    const img=str[str.length-1].split(".")[0]
    await cloudinary.uploader.destroy(img)
    await Product.findByIdAndDelete(req.params.id)
    res.json({message:"Product delete Success"})
})
exports.deactivateProduct= asyncHandler( async (req,res)=>{
    const {id}=req.params
    await Product.findByIdAndUpdate(id,{active:false})
    res.json({message:" deactive Product  Success"})
})
exports.activateProduct= asyncHandler( async (req,res)=>{
    const {id}=req.params
    await Product.findByIdAndUpdate(id,{active:true})
    res.json({message:" Activate Product Success"})
})
exports.getProductDetails= asyncHandler( async (req,res)=>{
    res.json({message:" get Product detail Success"})
})


// order

exports.getAllOrders= asyncHandler( async (req,res)=>{
    const result=await Order.find().populate("user",{password:0,active:0,createdAt:0,updatedAt:0,__v:0}).populate("products.product",{_id:1,name:1,desc:1,price:1,mrp:1,images:1})
    .sort({createdAt:-1})
    res.json({message:"Order fetch Success",result})
})
exports.getOrderDetail= asyncHandler( async (req,res)=>{
    res.json({message:"Order detail fetch Success"})
})
exports.cancelOrder= asyncHandler( async (req,res)=>{
    res.json({message:"Order cancel Success"})
})
exports.updateOrderStatus= asyncHandler( async (req,res)=>{
    const {id}= req.params
    const {status}=req.body
    await Order.findByIdAndUpdate(id,{status})
    res.json({message:"Order update Success"})
})

// user
exports.getAllUsers= asyncHandler( async (req,res)=>{
    res.json({message:"User fetch Success"})
})
exports.getUserDetail= asyncHandler( async (req,res)=>{
    res.json({message:"User detail fetch Success"})
})
exports.blockUser= asyncHandler( async (req,res)=>{
    res.json({message:" Block User  Success"})
})
exports.unblockUser= asyncHandler( async (req,res)=>{
    res.json({message:" Unblock User Success"})
})
exports.getUserOrders= asyncHandler( async (req,res)=>{
    res.json({message:"User order fetch Success"})
})