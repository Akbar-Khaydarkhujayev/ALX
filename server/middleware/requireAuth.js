const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    try {
        const { id:_id } = jwt.verify(authorization, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')

        next()
    }catch (error) {
        res.status(401).json(authorization)
    }
}

module.exports = requireAuth