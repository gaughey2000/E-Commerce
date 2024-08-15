require('dotenv').config();
const express = require('express');
const session = require('express-session')
const productRouter = require('./routes/productRouter');
const accountRouter = require('./routes/accountRouter');
const authRouter = require('./routes/authRouter');

const server = express();
const store = new session.MemoryStore()

const {
    PORT,
    SESSION_SECRET
} = process.env;

server.use(express.json())
server.use(session({
    secret: SESSION_SECRET,
    cookie: {maxAge: 3000000, sameSite: 'none', secure: true},
    saveUninitialized: false,
    store
}))

server.use('/products', productRouter)
server.use('/accounts', accountRouter)
server.use('/auth', authRouter)

server.listen(PORT, () => { 
    console.log('listening on port ' + PORT);
})