const userRoute = require("./src/user/route.user")

const billRoute = require('./src/customerBill/route.customerbill')
const router = require("express").Router()

router.use("/user", userRoute)
router.use("/bill", billRoute)

module.exports = router