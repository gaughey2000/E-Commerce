const DATA = require('./database');

const getAllAccounts = () => 
    DATA.query('SELECT * FROM account').then(d => d.rows);
const getAccountById = (id) =>
    DATA.query('SELECT * FROM account WHERE id = $1', [id]).then(d=>d.rows[0]);
const getAccountByFName = (fname) =>
    DATA.query('SELECT * FROM account WHERE first_name = $1', [fname]).then(d=>d.rows[0]);
const getAccountByLName = (lname) =>
    DATA.query('SELECT * FROM account WHERE last_name = $1', [lname]).then(d=>d.rows[0]);
const getAccountByEmail = (email) => 
    DATA.query('SELECT * FROM account WHERE email = $1', [email]).then(d=>d.rows[0]);
const updateAccountFName = (id, fname) => 
    DATA.query('UPDATE account SET first_name = $1 WHERE id = $2', [fname, id]);
const updateAccountLName = (id, lname) => 
    DATA.query('UPDATE account SET last_name = $1 WHERE id = $2', [lname, id]);
const updateAccountPassword = (id, newPassword) => 
    DATA.query('UPDATE account SET password = $1 WHERE id = $2', [newPassword, id]);
const updateAccountEmail = (id, newEmail) => 
    DATA.query('UPDATE account SET email = $1 WHERE id = $2', [newEmail, id]);
const insertAccount = (id, fname, lname, email, password) => 
    DATA.query('INSERT INTO account (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5', [id, fname, lname, email, password]);
const deleteAccount = (id) => 
    DATA.query('DELETE account WHERE id = $1', [id])
module.exports = {
    getAllAccounts,
    getAccountById,
    getAccountByFName,
    getAccountByLName,
    getAccountByEmail,
    updateAccountFName,
    updateAccountLName,
    updateAccountPassword,
    updateAccountEmail,
    insertAccount,
    deleteAccount
};