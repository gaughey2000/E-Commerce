// const express = require('express');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const crypto = require('crypto');
// const db = require('../db/database');
// const bcrypt = require('bcrypt')

// const authRouter = express.Router()

// passport.use(new LocalStrategy((username, password, cb) => {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ]).then((err, row) => {
//     if (err)
//       return cb(err);
//     if (!row)
//       return cb(null, false, { message: 'Incorrect username or password.' });
    
//     bcrypt.compare(password, row.hashed_password).then()

//     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, row);
//     });
//   });
// }));

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

// authRouter.post('/login/password', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

// module.exports = authRouter;

const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const { getAccountByEmail } = require('../db/accounts')


//login
authRouter.post('/', async (req, res) => {
  const {email, password} = req.body
  const user = await getAccountByEmail(email)

  if(!user)
    return res.sendStatus(404)
  
  const compare = await bcrypt.compare(password, user.password)

  if(!compare)
    return res.sendStatus(403)

  req.session.auth = true
  req.session.user = user.id

  return res.send(user)
});

module.exports = authRouter;