require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
//Routes
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({message: "Hello world"})
})

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })