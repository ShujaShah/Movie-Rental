const express = require('express');
const { Rental, validateRental } = require('../models/entities/rental');
const { Movie } = require('../models/entities/movie');
const { Customer } = require('../models/entities/customer');
const mongoose = require('mongoose');

//Getting all the rentals
const GetRentals = async (req, res) => {
  const rentals = await Rental.find()
    .sort('-dateOut')
    .populate('customer')
    .populate('movie');
  res.status(201).send(rentals);
};

//Creating a Rental
const CreateRental = async (req, res) => {
  const { error } = validateRental(req.body);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send('Customer with the given id not found');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send('Movie with the given id not found');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie is out of stock');

  // if you are embedding an document
  //   let rental = new Rental({
  //   customer: {
  //     _id: customer._id,
  //     email: customer.email,
  //     name: customer.name,
  //     phone: customer.phone,
  //   },
  //   movie: {
  //     _id: movie._id,
  //     title: movie.title,
  //     genre: movie.genre.name,
  //     dailyRentalRate: movie.dailyRentalRate,
  //   },
  // });

  //if you are just referencing a document
  let rental = new Rental({
    customer: customer.id,
    movie: movie.id,
  });
  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  //populate the customer and rental:
  rental = await (
    await rental.populate('customer', 'name email')
  ).populate('movie', 'title, genre');
  res.status(201).send(rental);
};

//Deleting the Rental
const DeleteRental = async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental)
    return res.status(404).send('Rental with the given id not found');
  res.status(201).send(rental);
};

//Getting a Single Rental
const GetRental = async (req, res) => {
  let rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send('Rental with the given id not found');
  rental = await (
    await rental.populate('customer', 'name email')
  ).populate('movie', 'title genre');
  res.status(201).send(rental);
};

//Getting rental by customer
const CustomerRental = async (req, res) => {
  const customerId = req.params.id;

  if (!customerId)
    return res.status(404).send('Customer with the given id not found');

  // Find rentals by customer ID
  const rentals = await Rental.find({ customer: customerId })
    .populate('customer', 'name email')
    .populate('movie', 'title genre movieBanner dailyRentalRate');

  if (!rentals || rentals.length === 0) {
    return res.status(404).send('No rentals found for the given customer ID');
  }

  res.status(200).send(rentals);
};

module.exports = {
  GetRentals,
  CreateRental,
  DeleteRental,
  GetRental,
  CustomerRental,
};
