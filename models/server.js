const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { repairRouter } = require('../routes/repair.routes');
const globalErrorHandler = require('../controllers/error.controller');
const initModel = require('./init.model');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path Routes
    this.paths = {
      repairs: '/api/v1/repairs',
      users: '/api/v1/users',
    };

    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.repairs, repairRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated 😁'))
      .catch(err => console.log(err));

    //relations
    initModel();

    db.sync()
      .then(() => console.log('Database synced 😁'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port 😁', this.port);
    });
  }
}

module.exports = Server;
