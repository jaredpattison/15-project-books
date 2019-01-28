'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');

const methodOverride = require('./middleware/method-override.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const DB = process.env.DB || 'pg';
const bookApp = require(`./routes/book-app-${DB}.js`);
const app = express();
// Application Setup
let isRunning = false;
module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride);
app.use(express.static('public'));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// API Routes
app.use(bookApp);

// Fallback Routes
app.get('*', notFoundHandler);
app.use(errorHandler);
