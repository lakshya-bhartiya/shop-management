const userRoute = require("./src/user/route.user")

const billRoute = require('./src/customerBill/route.customerbill')

const customerRoute = require("./src/customer/route.customer")
const router = require("express").Router()

router.use("/user", userRoute)
router.use("/bill", billRoute)
router.use("/customer", customerRoute)

module.exports = router