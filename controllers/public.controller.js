const asyncHandler= require("express-async-handler")
const Product =require("../models/Product")
// publicgetAllProducts 
// publicgetproductsdetails

exports.publicgetAllProducts= asyncHandler( async (req,res)=>{
    const result=await Product.find({active:true})
    res.json({message:" public fetch Product  Success",result})
})
exports.publicgetProductsdetails= asyncHandler( async (req,res)=>{
    const result=await Product.findById(req.params.id)

    res.json({message:" public fetch Product details  Success",result})
})