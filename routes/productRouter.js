const express = require('express')
const {v4} = require('uuid')
const { getAllProducts, getProductById, getAllProductsByCatagory, updateProductPrice, updateProductName, updateProductDescription, updateProductCatagory, insertProduct, deleteProduct } = require('../db/products')
const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    try{
        const products = await getAllProducts()
        if(!products)
            return res.sendStatus(404)
        return res.send(products)
    }catch(err){
        return res.send(err)
    }
})
productRouter.get('/id/:id', async (req, res) => {
    try{
        const {id} = req.params
        const product = await getProductById(id)
        if(!product)
            return res.sendStatus(404)
        return res.send(product)
    }catch(err){
        return res.send(err)
    }
})
productRouter.get('/catagory/:cat', async (req, res) => {
    try{
        const {cat} = req.params
        const products = await getAllProductsByCatagory(cat)
        if(!products)
            res.sendStatus(404)
        return res.send(products)
    }catch(err){
        return res.send(err)
    }
})

productRouter.put('/price/:id', async (req, res) => {
    try{
        const {id} = req.params
        const {price} = req.body
        const update = await updateProductPrice(id, price)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        return res.send(product)
    }catch(err){
        return res.send(err)
    }
})
productRouter.put('/name/:id', async (req, res) => {
    try{
        const {id} = req.params
        const {name} = req.body
        const update = await updateProductName(id, name)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        return res.send(product)
    }catch(err){
        return res.send(err)
    }
})
productRouter.put('/description/:id', async (req, res) => {
    try{
        const {id} = req.params
        const {description} = req.body
        const update = await updateProductDescription(id, description)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        return res.send(product)
    }catch(err){
        return res.send(err)
    }
})
productRouter.put('/catagory/:id', async (req, res) => {
    try{
        const {id} = req.params
        const {catagory} = req.body
        const update = await updateProductCatagory(id, catagory)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        return res.send(product)
    }catch(err){
        return res.send(err)
    }
})

productRouter.post('/', async (req, res) => {
    try{
        const id = v4()
        const {name, description, price, catagory} = req.body
        const insert = await insertProduct(id, name, price, description, catagory)
        if(!insert.rowCount)
            return res.sendStatus(500)
        const product = await getProductById(id)
        return res.send(product)
    }catch(err){
        return res.send(err)
    }
})

productRouter.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const del = await deleteProduct(id)
        if(!del.rowCount)
            return res.sendStatus(404)
        return res.send(202)
    }catch(err){
        return res.send(err)
    }
})
module.exports = productRouter