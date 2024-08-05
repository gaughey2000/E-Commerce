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