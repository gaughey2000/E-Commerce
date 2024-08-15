const express = require('express')
const {v4} = require('uuid')
const { getAllProducts, getProductById, getAllProductsByCatagory, updateProductPrice, updateProductName, updateProductDescription, updateProductCatagory, insertProduct, deleteProduct } = require('../db/products')
const { allProducts, sendProduct, idProduct, catagoryProduct, updatePrice, updateName, updateDescription, updateCatagory, addProd, delProd } = require('../middleware/product')
const productRouter = express.Router()
//get all products
productRouter.get('/', allProducts, sendProduct);
//get product by id
productRouter.get('/id/:id', idProduct, sendProduct);
//get products by catagory
productRouter.get('/catagory/:cat', catagoryProduct, sendProduct);
//update price
productRouter.put('/price/:id', updatePrice, sendProduct);
//update name
productRouter.put('/name/:id', updateName, sendProduct);
//update description
productRouter.put('/description/:id', updateDescription, sendProduct);
productRouter.put('/catagory/:id', updateCatagory, sendProduct)
//add product
productRouter.post('/', addProd , sendProduct)
//delete product
productRouter.delete('/:id', delProd)
module.exports = productRouter