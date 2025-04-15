var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const checkout = require('./routes/checkout');
app.use('/checkout', checkout);

app.use('/.well-known', express.static(path.join(__dirname, 'well-known')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// app.engine('hbs', hbs.engine({
//   extname: 'hbs',
//   defaultLayout: 'layout',  // You might have a different default layout
//   layoutsDir: path.join(__dirname, 'views/layouts')
// }));

// pp.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));

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
