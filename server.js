const express = require('express');
const productRouter = require('./app/Routes/productsRoute');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.use('/products', productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});