
const asyncHandler= require("express-async-handler")
const Order=require("../models/Order")
exports.userGetAllOrders= asyncHandler( async (req,res)=>{
    const result=await Order.find({user:true})

    res.json({message:" User fetch order  Success",result})
})
exports.userGetOrderDetails= asyncHandler( async (req,res)=>{
    const result=await Order.findById(req.params.id)

    res.json({message:" User fetch order details  Success",result})
})
exports.userUpdatePassword= asyncHandler( async (req,res)=>{
    res.json({message:" Update Password  Success"})
})
exports.userPlaceOrder= asyncHandler( async (req,res)=>{
   await Order.create(req.body)

    res.json({message:" Place Order  Success"})
})
exports.usercancelOrder= asyncHandler( async (req,res)=>{
    await Order.findByIdAndDelete(req.params.id,{status:"cancel"})

    res.json({message:" cancel Order  Success"})
})