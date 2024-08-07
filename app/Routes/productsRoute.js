const express = require('express');
const { getProductById, getProductByCatagory, getProductByName } = require('../databasepg');
const router = express.Router()

//get products by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const targetProduct = await getProductById(id)

    if(!targetProduct) {
        return res.sendStatus(404);
    }

    res.json(targetProduct);
});

//get product by catagory
router.get('/:catagory', async (req, res) => {
    const { catagory } = req.params;
    const targetProduct = await getProductByCatagory(catagory)

    if(!targetProduct){
        return res.sendStatus(404)
    }

    res.json(targetProduct);
});

//get product by name
router.get('/:name', async (req, res) => {
    const { name } = req.params;
    const targetProduct = await getProductByName(name)

    if(!targetProduct){
        return res.sendStatus(404)
    }

    res.json(targetProduct)
})
