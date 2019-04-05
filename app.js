let createError = require('http-errors');
let express = require('express');
let path = require('path');
let indexRouter = require('./routes/index');
let app = express();
let mongoose =require('mongoose');
// view engine setup

try{
  mongoose.connect('mongodb://localhost:27017/flipkart_mobiles',{
    useNewUrlParser:true
  });
}catch(err){
  console.log(err);
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;