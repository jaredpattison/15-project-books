'use strict';

const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

module.exports = mongoose;
