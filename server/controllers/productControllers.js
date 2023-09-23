const Product = require('../models/productModel')
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {

    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

const getProducts = async (req, res) => {
    const user_id = req.user._id

    const products = await Product.find({user_id}).sort({createdAt: -1})

    res.status(200).json(products)
}

const getProductById = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }

    const product = await Product.findById(id)

    if(!product) {
        return res.status(404).json({error: "No such product"})
    }

    res.status(200).json(product)
}

const createProduct = async (req, res) => {

    const {name, description, price, image, category} = req.body

    try {
        const user_id = req.user._id
        const product = await Product.create({name, description, price, image, category, user_id})
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }

    const product = await Product.findOneAndDelete({_id: id})

    if(!product) {
        return res.status(400).json({error: "No such product"})
    }

    res.status(200).json(product)
}

const updateProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }

    const product = await Product.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!product) {
        return res.status(400).json({error: "No such product"})
    }

    res.status(200).json(product)
}

module.exports = {
    getAllProducts,
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}