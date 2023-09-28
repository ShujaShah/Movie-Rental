const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/entities/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid Email or Password!');

  //compare the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Password not valid!');

  // generate the token: logic in user model
  const token = user.generateAuthToken();
  res.status(201).header('x-auth-token', token).send(token);
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email({}).required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(user);
}

module.exports = router;
