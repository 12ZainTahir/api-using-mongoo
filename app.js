var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var config=require('config');
var indexRouter = require('./routes/index');
var employeesRouter=require('./routes/api/employees');
var usersRouter=require('./routes/api/users');
var cors=require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: "*",
  })
);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/employees', employeesRouter);

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
mongoose.connect("mongodb+srv://zain:zain@cluster0.beeiw.mongodb.net/empcrud?retryWrites=true&w=majority",{
  useNewUrlParser:true
}).then(()=>console.log("CTM")).catch((error)=>console.log(error.message));

module.exports = app;
