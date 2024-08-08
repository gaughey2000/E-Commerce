const express = require('express');
const {v4} = require('uuid')
const { getAllAccounts, getAccountById, getAccountByFName, getAccountByLName, getAccountByEmail, updateAccountFName, updateAccountPassword, updateAccountLName, updateAccountEmail, insertAccount, deleteAccount } = require('../db/accounts');
const { getProductById } = require('../db/products');
const accountRouter = express.Router();

//get all accounts
accountRouter.get('/', async (req, res) => {
    try {
        const accounts = await getAllAccounts();
        if(!accounts){
            return res.sendStatus(404)
        };
        return res.send(accounts)
    } catch(err) {
        return res.send(err)
    }
});
//get account by id
accountRouter.get('/id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const targetAccount = await getAccountById(id);

        if(!targetAccount){
            return res.sendStatus(404)
        }
        return res.send(targetAccount)
    } catch(err){
        return res.send(err)
    }
});
//get account by name
accountRouter.get('/fname/:fname', async (req, res) => {
    try {
        const { fname } = req.params;
        const targetAccount = await getAccountByFName(fname);

        if(!targetAccount)
            return res.sendStatus(404);
        return res.send(targetAccount)

    } catch(err) {
        return res.send(err)
    }
});
accountRouter.get('/lname/:lname', async (req, res) => {
    try {
        const { lname } = req.params;
        const targetAccount = await getAccountByLName(lname);

        if(!targetAccount)
            return res.sendStatus(404);
        return res.send(targetAccount)

    } catch(err) {
        return res.send(err)
    }
});
//get account by email
accountRouter.get('/email/:email', async (req,res) => {
    try {
        const { email } = req.params;
        const targetAccount = await getAccountByEmail(email);

        if(!targetAccount)
            res.sendStatus(404);
        res.send(targetAccount);

    } catch(err) {
        res.send(err);
    }
});
//update account name
accountRouter.put('/fname/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fname } = req.body;

        const update = await updateAccountFName(id, fname)
        if(!update.rowCount){
            res.sendStatus(500)
        }
        const account = getAccountById(id);
        res.send(account)
    } catch(err) {
        res.send(err)
    }
});
accountRouter.put('/lname/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { lname } = req.body;

        const update = await updateAccountLName(id, lname)
        if(!update.rowCount){
            res.sendStatus(500)
        }
        const account = getAccountById(id);
        res.send(account)
    } catch(err) {
        res.send(err)
    }
});
//update password
accountRouter.put('/password/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const update = await updateAccountPassword(id, password)
        if(!update.rowCount){
            res.sendStatus(500)
        }
        const account = getAccountById(id);
        res.send(account)
    } catch(err) {
        res.send(err)
    }
});
//update email
accountRouter.put('/email/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const update = await updateAccountEmail(id, email)
        if(!update.rowCount){
            res.sendStatus(500)
        }
        const account = getAccountById(id);
        res.send(account)
    } catch(err) {
        res.send(err)
    }
});
//add account
accountRouter.post('/', async (req, res) => {
    try {
        const id = v4();
        const {fname, lname, email, password} = req.body

        const insert = await insertAccount(id, fname, lname, email, password);
        if(!insert.rowCount)
            return res.sendStatus(500)
        const newAccount = await getProductById(id);
        res.send(newAccount)
    } catch(err) {
        res.send(err)
    }
})
//delete account
accountRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const del = await deleteAccount(id);
        if(!del.rowCount)
            return res.sendStatus(500)
        return res.send(200)
    } catch(err) {
        res.send(err)
    }
});
module.exports = accountRouter;