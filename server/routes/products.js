const express = require('express')

const {
    getAllProducts,
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/productControllers')

const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/', getAllProducts)

router.get('/my', getProducts)

router.get('/:id', getProductById)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

module.exports = router