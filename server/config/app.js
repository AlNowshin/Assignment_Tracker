let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let trackRouter = require('../routes/track');

// View engine setup
app.set('views', path.join(__dirname, '../views'));  // Ensure this points to the correct 'views' folder
app.set('view engine', 'ejs');
// getting-started.js
const mongoose = require('mongoose');
let DB = require('./db');
// point mongoose to the DB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
  console.log("Connected with the MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));  // Assuming your 'public' folder is one level up from 'server'
app.use(express.static(path.join(__dirname, '../../node_modules')));  // Serving node_modules for front-end libraries

// Routers setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/track', trackRouter); // Use assignment tracker routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
