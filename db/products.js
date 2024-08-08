const DATA = require("./database");

//get
const getAllProducts = () => 
    DATA.query('SELECT * FROM product').then(d=>d.rows);
const getAllProductsByCatagory = catagory => 
    DATA.query('SELECT * FROM product WHERE catagory = $1', [catagory]).then(d=>d.rows);
const getProductById = id => 
    DATA.query('SELECT * FROM product WHERE id = $1', [id]).then(d=>d.rows[0]);
//update
const updateProductPrice = (id, price) => 
    DATA.query('UPDATE product SET price = $1 WHERE id = $2', [price, id]);
const updateProductDescription = (id, description) => 
    DATA.query('UPDATE product SET description = $1 WHERE id = $2', [description, id]);
const updateProductCatagory = (id, catagory) => 
    DATA.query('UPDATE product SET catagory = $1 WHERE id = $2', [catagory, id]);
const updateProductName = (id, name) => 
    DATA.query('UPDATE product SET name = $1 WHERE id = $2', [name, id]);
//post & delete
const insertProduct = (id, name, price, description, catagory) => 
    DATA.query('INSERT INTO product (id, name, price, description, catagory) VALUES ($1, $2, $3, $4, $5)', [id, name, price, description, catagory]);
const deleteProduct = (id) => 
    DATA.query('DELETE FROM product WHERE id = $1', [id]);


module.exports = {
    getAllProducts, getProductById, getAllProductsByCatagory,
    updateProductPrice, updateProductName, updateProductCatagory, updateProductDescription,
    insertProduct, deleteProduct
}