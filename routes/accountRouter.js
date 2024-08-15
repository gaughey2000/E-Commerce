const express = require('express');
const {v4} = require('uuid')
const { getAllAccounts, getAccountById, getAccountByFName, getAccountByLName, getAccountByEmail, updateAccountFName, updateAccountPassword, updateAccountLName, updateAccountEmail, insertAccount, deleteAccount } = require('../db/accounts');
const { getProductById } = require('../db/products');
const accountRouter = express.Router();
const bcrypt = require('bcrypt');
const { allAccounts, sendAccounts, idAccount, fnAccount, lnAccount, emailAccount, updateFirstName, updateLastName, updatePassword, updateEmail, addAccount } = require('../middleware/account');

//gets
accountRouter.get('/', allAccounts, sendAccounts)

accountRouter.get('/id/:id', idAccount, sendAccounts);

accountRouter.get('/fname/:fname', fnAccount, sendAccounts);
accountRouter.get('/lname/:lname', lnAccount, sendAccounts);
accountRouter.get('/email/:email', emailAccount, sendAccounts);

//update account name
accountRouter.put('/fname/:id', updateFirstName, sendAccounts);
accountRouter.put('/lname/:id', updateLastName, sendAccounts);
//update password
accountRouter.put('/password/:id', updatePassword, sendAccounts);
//update email
accountRouter.put('/email/:id', updateEmail, sendAccounts);
//add account
accountRouter.post('/', addAccount, sendAccounts);
//delete account
accountRouter.delete('/:id', deleteAccount);
module.exports = accountRouter;