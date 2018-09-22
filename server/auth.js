const router = require('express').Router();
const { User } = require('./db');
module.exports = router;

// auth routes go below!

router.put('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email, password } })
    .then(user => {
      if (user) res.send(user);
      else {
        const err = new Error('Incorrect email or password!');
        err.status = 401;
        next(err);
      }
    })

    .catch(next);
});
