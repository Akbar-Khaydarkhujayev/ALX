const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (id) => {
    return jwt.sign({id: id}, process.env.SECRET, {expiresIn: '7d'})
}

//Register
const registerUser = async (req, res) => {
    const {firstName, lastName, phone, email, password, confirmPassword} = req.body

    try {
        const user = await User.register(firstName, lastName, phone, email, password, confirmPassword)

        const token = createToken(user._id)

        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Login
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {registerUser, loginUser}