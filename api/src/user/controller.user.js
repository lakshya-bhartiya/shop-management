const userService = require("./service.user")
const jwttoken = require("jsonwebtoken")
require('dotenv').config()
const userController = {}
const bcrypt = require("bcrypt")
userController.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword, mobile } = req.body
    const userData = await userService.findUserByEmail(email)
    if (userData) {
        return res.send({ status: false, msg: "email already exists", data: null })
    }
    const userMobile = await userService.findUserByMobile(mobile)
    if (userMobile) {
        return res.send({ status: false, msg: "mobile already exists", data: null })
    }
    try {
        if (password !== confirmPassword) {
            return res.send({ status: false, msg: "password and confirm password does not match", data: null })
        }
        const createdUser = await userService.registerUser({ name, email, password, mobile, confirmPassword });
        if (createdUser) {
            var token = jwttoken.sign({ _id: createdUser._id }, process.env.TOKEN_SECRET)
            return res.send({ status: true, msg: "user registered successfully", data: { createdUser, token: token } });
        }
    } catch (error) {
        console.log(error)
        return res.send({ status: false, msg: "Something went wrong", data: null });
    }
};
userController.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const loginUsers = await userService.findUserByEmail(email)
        if (!loginUsers) {
            return res.send({ status: false, msg: "user not found", data: null })
        }
        let compare = bcrypt.compareSync(password, loginUsers.password)
        if (compare) {
            var token = jwttoken.sign({ _id: loginUsers._id }, process.env.TOKEN_SECRET)
            return res.send({ status: true, msg: "user login successfully", data: loginUsers, token: token })
        } else {
            return res.send({ status: false, msg: "invalid credantials" })
        }
    } catch (err) {
        console.log(err)
        return res.send({ status: false, msg: "something went wrong", error: err })
    }
}
module.exports = userController