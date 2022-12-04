var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const dev_db_url ="mongodb+srv://JoffreyVC:9e28d91f@clusterlabo.jpdgxof.mongodb.net/?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var indexRouter = require('./routes/index'); //importeert modules van de routes 
var usersRouter = require('./routes/users');
//var userRouter = require('./routes/user');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" 
const helmet = require("helmet");
const compression = require("compression");
var app = express();








mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'secret', resave: false,  saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public')); 


//app.use('/user', userRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter);
app.use(compression()); // Compress all routes





app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
