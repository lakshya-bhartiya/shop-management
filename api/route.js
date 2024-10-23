const userRoute = require("./src/user/route.user")

const billRoute = require('./src/customerBill/route.customerbill')

const customerRoute = require("./src/customer/route.customer")

const productRoute = require("./src/products/route.products")

const vendorRoute = require("./src/vendors/route.vendor")


const categoryRoute = require("./src/category/route.category")
const customerInvoiceRoute = require("./src/invoiceTransaction/route.invoiceTransaction")
const customerReceivedAmountRoute = require("./src/customerReceivedAmount/route.customerReceivedAmount")
const customerPaymentRoute = require("./src/customerRemainingPayment/route.customerRemainingAmount")
const transactionRoute = require("./src/invoiceTransaction/route.invoiceTransaction")
const router = require("express").Router()




router.use("/user", userRoute)
router.use("/bill", billRoute)
router.use("/customer", customerRoute)
router.use("/product", productRoute)
router.use("/vendors", vendorRoute )
router.use("/category", categoryRoute)
router.use("/customerReceivedAmount", customerReceivedAmountRoute)
router.use("/customerInvoice", customerInvoiceRoute)
router.use("/payment", customerPaymentRoute)
router.use("/transactions", transactionRoute)
module.exports = router