const express = require('express');
const winston = require('winston');
require('winston-mongodb');
const asyncMiddleware = require('express-async-errors');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');

const HomeRouter = require('./src/routes/home');
const CustomersRouter = require('./src/routes/customers');
const GenresRouter = require('./src/routes/genres');
const MoviesRouter = require('./src/routes/movies');
const RentalsRouter = require('./src/routes/rentals');
const UsersRouter = require('./src/routes/users');
const AuthRouter = require('./src/routes/auth');
const ErrorHandler = require('./src/middlewares/error');
const dbConn = require('./src/bin/config').dbConn;

var app = express();
app.use(express.json());
app.use(morgan('tiny'));
let mongo_url = process.env.MONGO_URL;

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: mongo_url, level: 'error' }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    optionSuccessStatus: 200,
  })
);
app.use('/', HomeRouter);
app.use('/api/customers', CustomersRouter);
app.use('/api/genres', GenresRouter);
app.use('/api/movies', MoviesRouter);
app.use('/api/rentals', RentalsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/auth', AuthRouter);
//app.use(ErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

//test commit
