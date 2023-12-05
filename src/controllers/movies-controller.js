const express = require('express');
const { Movie, validateMovie } = require('../models/entities/movie');
const { Genre } = require('../models/entities/genre');

const router = express.Router();

//Get all Movies
// const GetMovies = async (req, res) => {
//   const movies = await Movie.find().sort('name');
//   res.status(201).send(movies);
// };

// Get all movies including query based filtering for genres
const GetMovies = async (req, res) => {
  const genreFilter = req.query.genre;
  const searchQuery = req.query.search;

  // Construct the base query based on the genre filter
  const baseQuery = genreFilter ? { 'genre._id': genreFilter } : {};

  // Add the search filter to the base query if a search term is provided
  const query = searchQuery
    ? { ...baseQuery, $or: [{ title: { $regex: searchQuery, $options: 'i' } }] }
    : baseQuery;

  console.log('Query:', query);

  const movies = await Movie.find(query).sort('name');

  // Calculate the movie count as per the filter or no filter
  let movieCount;
  if (genreFilter) {
    movieCount = await Movie.countDocuments({ 'genre._id': genreFilter });
  } else {
    movieCount = await Movie.countDocuments();
  }
  res.status(200).json({ movies, movieCount });
};

//Create a Movie
const CreateMovie = async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(404).send('Genre with given id not found');
  let movie = new Movie({
    title: req.body.title,
    slug: req.body.slug,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    movieBanner: req.body.movieBanner,
  });
  movie = await movie.save();
  res.status(201).send(movie);
};

//Updating a Movie
const UpdateMovie = async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(404).send('Genre with given id not found');
  let movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      slug: req.body.slug,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  movie = await movie.save();
  res.status(201).send(movie);
};

//Deleting a Movie
const DeleteMovie = async (req, res) => {
  let movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send('Movie with the given id not found');
  res.status(201).send(movie);
};

//Getting a single movie
const GetMovie = async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send('Movie with the given id not found');
  res.status(201).send(movie);
};

module.exports = {
  CreateMovie,
  UpdateMovie,
  DeleteMovie,
  GetMovie,
  GetMovies,
};
