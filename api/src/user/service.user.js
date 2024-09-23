const user = require("./model.user")

const userService = {}
const bcrypt = require("bcrypt")


userService.registerUser = async ({ name, email, password, mobile }) => {

    const hash = bcrypt.hashSync(password, 10)
    let newUser = await user.create({ name, email, password: hash, mobile})
    return newUser
}

userService.findUserByEmail = async(email) => {
    const users = await user.findOne({email})
    return users
}

userService.findUserByMobile = async(mobile) => {
    const users = await user.findOne({mobile})
    return users
}
module.exports = userService