const express = require('express');
const { getProductById, getProductByCatagory, getProductByName } = require('../databasepg');
const productRouter = express.Router()

//get products by id
productRouter.get('id/:id', async (req, res) => {
    const { id } = req.params;
    const targetProduct = await getProductById(id)
    if(!targetProduct) {
        return res.sendStatus(404);
    }
    res.json(targetProduct);
});

//get product by catagory
productRouter.get('catagory/:catagory', async (req, res) => {
    const { catagory } = req.params;
    console.log(catagory)
    const targetProduct = await getProductByCatagory(catagory)
    if(!targetProduct){
        return res.sendStatus(404)
    }

    res.json(targetProduct);
});

//get product by name
productRouter.get('name/:name', async (req, res) => {
    const { name } = req.params;
    const targetProduct = await getProductByName(name)

    if(!targetProduct){
        return res.sendStatus(404)
    }

    res.json(targetProduct)
})

module.exports = productRouter