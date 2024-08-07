const express = require('express');
const { getUser, updateUserFirstName, updateUserLastName, updateUserEmail, updateUserPassword } = require('../databasepg');
const route = express.Router();


//check user exist
route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const targetUser = await getUser(id)

    if(!targetUser){
        return res.sendStatus(404)
    };

    res.json(targetUser)
});
//update user first name
route.put('/first/:id', async (req, res) => {
    const { new_first_name } = req.body;
    const { id } = req.params;

    const targetUser = await getUser(id)
    if(!targetUser){
        return res.sendStatus(404)
    };

    const updatedData = await updateUserFirstName(new_first_name, id);
    res.send(updatedData);
});
//update user last name
route.put('/last/:id', async (req, res) => {
    const { new_last_name } = req.body;
    const { id } = req.params;

    const targetUser = await getUser(id)
    if(!targetUser){
        return res.sendStatus(404)
    };

    const updatedData = await updateUserLastName(new_last_name, id);
    res.send(updatedData);
});
//update user email
route.put('/email/:id', async (req, res) => {
    const { new_email } = req.body;
    const { id } = req.params;

    const targetUser = await getUser(id)
    if(!targetUser){
        return res.sendStatus(404)
    };

    const updatedData = await updateUserEmail(new_email, id);
    res.send(updatedData);
});
//update user password
route.put('/password/:id', async (req, res) => {
    const { new_password } = req.body;
    const { id } = req.params;

    const targetUser = await getUser(id);
    if(!targetUser){
        return res.sendStatus(404)
    };

    const updatedData = await updateUserPassword(new_password, id);
});