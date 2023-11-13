const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Customer = require('./customer');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
    minlength: 5,
    maxlength: 50,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customerRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.JWTPrivateKey,
    { expiresIn: '35d' }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } })
      .min(5)
      .required(),
    name: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    customerRef: Joi.string(),
  });
  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
