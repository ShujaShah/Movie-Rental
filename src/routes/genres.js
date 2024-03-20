const express = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();
const validateObjectId = require('../middlewares/validateObjectId');

const {
  GetGenre,
  GetGenres,
  CreateGenre,
  UpdateGenre,
  DeleteGenre,
} = require('../controllers/genres-controller');

//Get All genre
router.get('/', GetGenres);

//Create a genre
router.post('/', auth, CreateGenre);

//Updating a genre
router.put('/:id', UpdateGenre);

//Deleting a genre
router.delete('/:id', [auth, admin], DeleteGenre);

//Getting a single genre
router.get('/:id', validateObjectId, GetGenre);

module.exports = router;
