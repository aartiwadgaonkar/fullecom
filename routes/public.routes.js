const router = require("express").Router()
const publicController=require("./../controllers/public.controller")
router
.get("/products",publicController.publicgetAllProducts)
.get("/product/:id",publicController.publicgetProductsdetails)




module.exports = router