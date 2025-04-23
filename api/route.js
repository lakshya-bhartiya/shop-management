const userRoute = require("./src/user/route.user")
const billRoute = require('./src/customerBill/route.customerbill')
const customerRoute = require("./src/customer/route.customer")
const productRoute = require("./src/products/route.products")
const vendorRoute = require("./src/vendors/route.vendor")
const categoryRoute = require("./src/category/route.category")
const router = require("express").Router()


router.use("/user", userRoute)
router.use("/bill", billRoute)
router.use("/customer", customerRoute)
router.use("/product", productRoute)
router.use("/vendors", vendorRoute )
router.use("/category", categoryRoute)
module.exports = router