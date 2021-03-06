var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var goodsRouter = require('./routes/goods');
var sellerRouter = require('./routes/seller');
var storeRouter = require('./routes/store');
var commentsRouter = require('./routes/comments');
var orderRouter = require('./routes/order');
var uploadRouter = require('./routes/upload');
var likesRouter = require('./routes/likes');


const conn = mongoose.connection
var app = express();


mongoose.connect('mongodb://localhost/cms');
conn.on("open", function () {
  console.log("mongodb启动成功")
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploadFile',express.static(path.join(__dirname, 'uploadFile')));//设置成静态文件

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/goods', goodsRouter);
app.use('/seller', sellerRouter);
app.use('/store', storeRouter);
app.use('/comments', commentsRouter);
app.use('/order', orderRouter);
app.use('/upload', uploadRouter);
app.use('/likes', likesRouter);



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
