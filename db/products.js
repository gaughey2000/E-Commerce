const DATA = require("./database");

const getAllProducts = () => DATA.query('SELECT * FROM product').then(d=>d.rows)

module.exports = {getAllProducts}