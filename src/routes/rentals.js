const express = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const {
  GetRentals,
  CreateRental,
  DeleteRental,
  GetRental,
} = require('../controllers/rental-controller');

const router = express.Router();

//Getting all the rentals
router.get('/', GetRentals);

//Creating a Rental
router.post('/', auth, CreateRental);

//Deleting the Rental
router.delete('/:id', [auth, admin], DeleteRental);

//Getting a Single Rental
router.get('/:id', GetRental);
module.exports = router;
