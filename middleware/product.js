const { getAllProductsByCatagory, getProductById, getAllProducts, updateProductPrice, updateProductName, updateProductDescription, updateProductCatagory, insertProduct, deleteProduct } = require("../db/products");

const sendProduct = (req, res) => {
    const {product} = req
    if(!product)
        return res.sendStatus(404)
    return res.send(product)   
}


const allProducts = async (req, res) => {
    try{
        const products = await getAllProducts()
        if(!products)
            return res.sendStatus(404)
        req.product = products
        next()

    }catch(err){
        return res.send(err)
    }
};
const idProduct = async (req, res) => {
    try{
        const {id} = req.params
        const product = await getProductById(id)
        if(!product)
            return res.sendStatus(404)
        req.product = product
        next()

    }catch(err){
        return res.send(err)
    }
}
const catagoryProduct = async (req, res) => {
    try{
        const {cat} = req.params
        const products = await getAllProductsByCatagory(cat)
        if(!products)
            res.sendStatus(404)
        req.product = products
        next();

    }catch(err){
        return res.send(err)
    }
}


const updatePrice = async (req, res) => {
    try{
        const {id} = req.params
        const {price} = req.body
        const update = await updateProductPrice(id, price)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        req.product = product
        next();

    }catch(err){
        return res.send(err)
    }
}
const updateName = async (req, res) => {
    try{
        const {id} = req.params
        const {name} = req.body
        const update = await updateProductName(id, name)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        req.product = product
        next();
    }catch(err){
        return res.send(err)
    }
};
const updateDescription = async (req, res) => {
    try{
        const {id} = req.params
        const {description} = req.body
        const update = await updateProductDescription(id, description)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        req.product = product
    }catch(err){
        return res.send(err)
    }
};
const updateCatagory = async (req, res) => {
    try{
        const {id} = req.params
        const {catagory} = req.body
        const update = await updateProductCatagory(id, catagory)
        if(!update.rowCount)
            return res.sendStatus(404)
        const product = await getProductById(id)
        req.product = product
        next();
    }catch(err){
        return res.send(err)
    }
};


const addProd = async (req, res) => {
    try{
        const id = v4()
        const {name, description, price, catagory} = req.body
        const insert = await insertProduct(id, name, price, description, catagory)
        if(!insert.rowCount)
            return res.sendStatus(500)
        const product = await getProductById(id)
        req.product = product
        next();
    }catch(err){
        return res.send(err)
    }
}
const delProd = async (req, res) => {
    try{
        const {id} = req.params
        const del = await deleteProduct(id)
        if(!del.rowCount)
            return res.sendStatus(404)
        return res.send(202)
    }catch(err){
        return res.send(err)
    }
}

module.exports = {
    allProducts,
    idProduct,
    sendProduct,
    catagoryProduct,
    updatePrice,
    updateName,
    updateDescription,
    updateCatagory,
    addProd,
    delProd
}