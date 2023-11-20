const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 255,
  },
  slug: {
    type: String,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  movieBanner: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

//Defining the validation
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    slug: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
    movieBanner: Joi.string(),
  });
  return schema.validate(movie);
}

module.exports = {
  Movie,
  validateMovie,
};
