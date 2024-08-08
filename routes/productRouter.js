const express = require('express')
const { getAllProducts } = require('../db/products')
const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    try{
        const products = await getAllProducts()
        if(!products)
            res.sendStatus(404)
        res.send(products)
    }catch(err){
        res.send(err)
    }
})

module.exports = productRouter