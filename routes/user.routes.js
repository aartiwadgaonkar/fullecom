const router = require("express").Router()
const userController=require("./../controllers/user.controller")
router
.get("/order/:id",userController.userGetAllOrders)
.get("/order-details/:id",userController.userGetOrderDetails)
.post("/place-order",userController.userPlaceOrder)
.post("/update-password",userController.userUpdatePassword)
.put("/order-cancel/:id",userController.usercancelOrder)




module.exports = router