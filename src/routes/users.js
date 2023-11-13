const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const { User, validateUser } = require('../models/entities/user');
const { customer, Customer } = require('../models/entities/customer');
const admin = require('../middlewares/admin');

const router = express.Router();

// route to get the current user
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(201).send(user);
  console.log(user);
});

// route to get all the users
router.get('/', admin, async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).send('No users found');
  res.status(201).send(users);
});

// route to create a user
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send('user with the given email already exists');
  const customer = await Customer.findById(req.body.customerRef);
  if (!customer)
    return res.status(404).send('Customer with given id not found');

  // create the user...
  user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    //customerRef: req.body.customerRef,
    customerRef: {
      _id: customer._id,
      name: customer.name,
    },
  });

  //hash the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.populate('customerRef', 'name');
  user = await user.save();
  //console.log('here is the user', user);

  const token = user.generateAuthToken();
  res.status(201).header('x-auth-token', token).send(user);
});

module.exports = router;
