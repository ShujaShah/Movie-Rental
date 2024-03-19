const mongoose = require('mongoose');
const config = require('config');

let mongo_url = process.env.MONGO_URL;
const db = config.get('db');
mongoose
  .connect(db)
  .then(() => console.log(`Connected to the ${db}...`))
  .catch((err) => console.log('Error connecting the database', err));

module.exports = { dbConn: mongoose.connection };
