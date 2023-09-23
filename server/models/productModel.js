const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minLength: [4, "Minimal length is 4 characters"],
            maxLength: [16, "Max length is 16 characters"],
            required: [true, "Enter product title"],
        },
        description: {
            type: String,
            trim: true,
            minLength: [10, "Minimal length is 10 characters"],
            maxLength: [100, "Max length is 100 characters"],
            required: [true, "Enter product description"],
        },
        price: {
            type: Number,
            min: [1000, 'Price must be higher than 1000'],
            max: [10000000000, 'Price must be less than 10000'],
            required: [true, 'Enter product price'],
        },
        image: {
            type: String,
            trim: true,
            required: [true, "Choose image"],
        },
        category: {
            type: Object,
            required: [true, "Choose category"],
        },
        user_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;