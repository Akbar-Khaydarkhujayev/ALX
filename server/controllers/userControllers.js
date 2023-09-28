const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const User = require('../models/userModel')


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

//GetUserInfo
const getUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }

    const user = await User.findById(id).select('firstName phone email')

    if(!user) {
        return res.status(404).json({error: "No such User"})
    }

    res.status(200).json(user)
}

module.exports = {registerUser, loginUser, getUser}