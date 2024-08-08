const {Pool} = require('pg')

const credentials = {
    user: 'connormcgaughey',
    host: 'localhost',
    database: 'E-Commerce',
    password: 'connor123',
    port: 5432
}

const DATA = new Pool(credentials)

module.exports = DATA