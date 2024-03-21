const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    lowercase: true,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

//Defining the validation
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });
  return schema.validate(genre);
}

module.exports = {
  Genre,
  genreSchema,
  validateGenre,
};
