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

//product querrys

//get by id
const getProductById = (id) => 
    client.query('SELECT * FROM products WHERE id = $1', [id]).then(data => data.rows[0]);

//get by catagory
const getProductByCatagory = (catagory) => 
    client.query('SELECT * FROM products WHERE catagory = $1', [catagory]).then(data => data.rows);

//get by name
const getProductByName = (name) => 
    client.query('SELECT * FROM products WHERE name = $1', [name]).then(data => data.rows);





module.exports = {
    getProductById,
    getProductByCatagory,
    getProductByName
}