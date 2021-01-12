import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import './db';  
import usersRouter from './api/users';
import genresRouter from './api/genres';
import session from 'express-session';
import passport from './authenticate';
import swaggerUi from 'swagger-ui-express'
import {loadUsers, loadMovies} from './seedData';

const specs = require('./swagger.json')


dotenv.config();

const app = express();


if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
}

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};
//configure body-parser
app.use(bodyParser.json());

app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

// initialise passport​
app.use(passport.initialize());
// Add passport.authenticate(..)  to middleware stack for protected routes​
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter)  
app.use(errHandler);




export default app
