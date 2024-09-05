const userService = require("./service.user")

const jwttoken = require("jsonwebtoken")

require('dotenv').config()

const userController = {}
const bcrypt = require("bcrypt")


userController.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword, mobile } = req.body

    const userData = await userService.findUserByEmail(email)
    console.log(userData, "data")

    if (userData) {
        return res.send({ status: "ERR", msg: "email already exists", data: null })
    }

    const userMobile = await userService.findUserByMobile(mobile)
    console.log(userMobile, "mobile")

    if (userMobile) {
        return res.send({ status: "ERR", msg: "mobile already exists", data: null })
    }



    try {
        const createdUser = await userService.registerUser({ name, email, password, mobile });

        if(createdUser){
            var token = jwttoken.sign({ _id: createdUser._id }, process.env.TOKEN_SECRET)
            return res.send({ status: "OK ", msg: "user registered successfully", data: createdUser, token: token });
        }

        return res.send({ status: "OK ", msg: "user registered successfully", data: createdUser });

    } catch (error) {

        console.log(error, "register error")
        return res.send({ status: " ERR", msg: "Something went wrong", data: null });
    }
};


userController.loginUser = async(req, res) => {
    const { email, password, mobile } = req.body

    // do matched current login password and already registered password
    try {
        const loginUsers = await userService.findUserByEmail(email)

        if(!loginUsers){
           return res.send({status: "err", msg: "user not found", data: null})
        }

        if(loginUsers.mobile !== mobile){
            return res.send({status: "err", msg: "mobile no. not matched", data: null})    
        }



        let compare = bcrypt.compareSync(password, loginUsers.password)

        if(compare){
            var token = jwttoken.sign({ _id: loginUsers._id }, process.env.TOKEN_SECRET)
            return res.send({status:"ok",msg:"user login successfully",data:loginUsers, token: token})
        }else{
            return res.send({status:"err",msg:"user not login",data:null})
        }

    } catch (err) {
        console.log(err)
        return res.send({ status: "Err", msg: "something went wrong in loginUser", error: err })
    }

}



module.exports = userController
