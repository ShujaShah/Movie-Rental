const Joi = require('joi');
const mongoose = require('mongoose');

// const rentalSchema = new mongoose.Schema({
//   customer: {
//     type: new mongoose.Schema({
//       email: {
//         type: String,
//         required: true,
//         minlength: 3,
//         maxlength: 50,
//       },
//       name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50,
//       },
//       isGold: {
//         type: Boolean,
//         default: false,
//       },
//       phone: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50,
//       },
//     }),
//     required: true,
//   },
//   movie: {
//     type: new mongoose.Schema({
//       title: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 5,
//         maxlength: 50,
//       },
//       dailyRentalRate: {
//         type: Number,
//         required: true,
//         trim: true,
//         min: 0,
//         max: 255,
//       },
//       genre: {
//         type: String,
//         required: true,
//       },
//       dateOut: {
//         type: Date,
//         required: true,
//         default: Date.now,
//       },
//       rentalFee: {
//         type: Number,
//         min: 0,
//       },
//     }),
//   },
// });

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required,
    movieId: Joi.string().required(),
  });
  return schema.validate(rental);
}

module.exports = {
  Rental,
  validateRental,
};
