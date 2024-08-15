const { getAllAccounts, getAccountById, getAccountByEmail, updateAccountEmail, updateAccountPassword, updateAccountLName, updateAccountFName, insertAccount, deleteAccount } = require("../db/accounts");

const sendAccounts = (req, res) => {
    const {account} = req
    if(!account)
        return res.sendStatus(404)
    return res.send(account)
}


const allAccounts = async (req, res, next) => {
    try {
        const accounts = await getAllAccounts();
        if(!accounts){
            return res.sendStatus(404)
        };
        req.account = accounts
        next()
    } catch(err) {
        return res.send(err)
    }
};
const idAccount = async (req, res, next) => {
    const {id} = req.body
    try {
        const account = await getAccountById(id);
        if(!account){
            return res.sendStatus(404)
        };
        req.account = account
        next()
    } catch(err) {
        return res.send(err)
    }
};
const fnAccount = async (req, res) => {
    try {
        const { fname } = req.params;
        const targetAccount = await getAccountByFName(fname);

        if(!targetAccount)
            return res.sendStatus(404);
        req.account = targetAccount
        next()

    } catch(err) {
        return res.send(err)
    }
};
const lnAccount = async (req, res) => {
    try {
        const { lname } = req.params;
        const targetAccount = await getAccountByLName(lname);

        if(!targetAccount)
            return res.sendStatus(404);
        req.account = targetAccount
        next()

    } catch(err) {
        return res.send(err)
    }
};
const emailAccount = async (req, res) => {
    try {
        const { email } = req.params;
        const targetAccount = await getAccountByEmail(email);

        if(!targetAccount)
            return res.sendStatus(404);
        req.account = targetAccount
        next()

    } catch(err) {
        return res.send(err)
    }
};


const updateFirstName = async (req, res) => {
    try {
        const { id } = req.params;
        const { fname } = req.body;
        const update = await updateAccountFName(id, fname)
        if(!update.rowCount){
            res.sendStatus(500)
            }
        const account = await getAccountById(id);
        req.account = account;
        next()

        } catch(err) {
            res.send(err)
        }
};
const updateLastName = async (req, res) => {
    try {
        const { id } = req.params;
        const { lname } = req.body;
        const update = await updateAccountLName(id, lname)
        if(!update.rowCount){
            res.sendStatus(500)
            }
        const account = await getAccountById(id);
        req.account = account;
        next()

        } catch(err) {
            res.send(err)
        }
};
const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const hash = await bcrypt.hash(password, 10)
        const update = await updateAccountPassword(id, hash)
        if(!update.rowCount){
            res.sendStatus(500)
        }
        const account = await getAccountById(id);
        req.account = account;
        next()

    } catch(err) {
        res.send(err)
    }
};
const updateEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const update = await updateAccountEmail(id, email)
        if(!update.rowCount){
            res.sendStatus(500)
        }
        const account = await getAccountById(id);
        req.account = account
        next();
    } catch(err) {
        res.send(err)
    }
};


const addAccount = async (req, res) => {
    try {
        const id = v4();
        const {fname, lname, email, password} = req.body
        const hash = bcrypt.hash(password, 3)

        const insert = await insertAccount(id, fname, lname, email, hash);

        if(!insert.rowCount)
            return res.sendStatus(500)

        const newAccount = await getAccountById(id);
        req.account(newAccount)
        next();

    } catch(err) {
        res.send(err)
    }
};
const delAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const del = await deleteAccount(id);
        if(!del.rowCount)
            return res.sendStatus(500)
        return res.send(200)
    } catch(err) {
        res.send(err)
    }
};

module.exports = {
    allAccounts,
    idAccount,
    sendAccounts,
    fnAccount,
    lnAccount,
    emailAccount, 
    updateFirstName,
    updateLastName,
    updatePassword,
    updateEmail,
    addAccount,
    delAccount
}