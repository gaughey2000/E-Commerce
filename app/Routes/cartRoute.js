const express = require('express');
const router = express.Router();
//gets cart

router.get('/cart/:id', (req, res) => {
    const { id } = req.params;
    const cart = db.find((cart) => cart.id === id);
    if(!cart){
        res.status(404);
    }
    res.json(cart);
});