const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const { User, validateUser } = require('../models/entities/user');

const router = express.Router();

// route to get the current user
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(201).send(user);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send('user with the given email already exists');
  user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  //hash the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  const token = user.generateAuthToken();
  res.status(201).header('x-auth-token', token).send(user);
});

module.exports = router;
