const router = require("express").Router()
const publicController=require("./../controllers/public.controller")
router
.get("/products",publicController.publicgetAllProducts)
.get("/product-details/:id",publicController.publicgetProductsdetails)




module.exports = router