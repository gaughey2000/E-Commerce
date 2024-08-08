require('dotenv').config();
const express = require('express');
const productRouter = require('./routes/productRouter');
const server = express();

server.use(express.json())

server.use('/products', productRouter)

server.listen(process.env.PORT, () => { 
    console.log('listening on port ' + process.env.PORT);
})