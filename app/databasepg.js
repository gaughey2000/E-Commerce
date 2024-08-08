const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "E-Commerce"
});

client.connect();
client.query(`SELECT * FROM products`, (err,res) => {
    if(!err){
        console.log(res.rows)
    } else {
        console.log(err.message)
    }
    client.end
});

//PRODUCT
//get by id
const getProductById = (id) => 
    client.query('SELECT * FROM product WHERE id = $1', [id]).then(data => data.rows[0]);

//get by catagory
const getProductByCatagory = (catagory) => 
    client.query('SELECT * FROM product WHERE catagory = $1', [catagory]).then(data => data.rows);

//get by name
const getProductByName = (name) => 
    client.query('SELECT * FROM product WHERE name = $1', [name]).then(data => data.rows);

//USER
//get user
const getUser = (id) => 
    client.query('SELECT * FROM account WHERE id = $1', [id]).then(data => data.rows[0]);
//update user
const updateUserFirstName = (new_first_name, id) => 
    client.query(`UPDATE account SET first_name = $1 WHERE id = $2`, [new_first_name, id]);
const updateUserLastName = (new_last_name, id) => 
    client.query(`UPDATE account SET last_name = $1 WHERE id = $2`, [new_last_name, id]);
const updateUserEmail = (new_email, id) =>
    client.query('UPDATE account SET email = $1 WHERE id = $2', [new_email, id]);
const updateUserPassword = (new_password, id) => 
    client.query('UPDATE account SET password = $1 WHERE id = $2', [new_password, id]);

//CART
//add to cart
const addCart = (product_id) =>
    client.query('UPDATE cartitem SET ', [product_id]) ;

module.exports = {
    getProductById,
    getProductByCatagory,
    getProductByName,
    getUser,
    updateUserFirstName,
    updateUserLastName,
    updateUserEmail,
    updateUserPassword,
    addCart
}