var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const multer = require('multer');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var goodsRouter = require('./routes/goods');
var sellerRouter = require('./routes/seller');
var storeRouter = require('./routes/store');
var commentsRouter = require('./routes/comments');
var orderRouter = require('./routes/order');
const conn = mongoose.connection
var app = express();
var router = express.Router();

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
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/goods', goodsRouter);
app.use('/seller', sellerRouter);
app.use('/store', storeRouter);
app.use('/comments', commentsRouter);
app.use('/order', orderRouter);
const storage = multer.diskStorage({
  //文件存储位置    
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads/tmp/'));
  },
  //文件名    
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${Math.ceil(Math.random() * 1000)}_multer.${file.originalname.split('.').pop()}`);
  }
});
const uploadCfg = {
  storage: storage,
  limits: {
    //上传文件的大小限制,单位bytes    
    fileSize: 1024 * 1024 * 20
  }
};
router.post("/api/upload", async (req, res) => {
  let upload = multer(uploadCfg).any();
  upload(req, res, async (err) => {
    if (err) {
      res.json({ path: `//uploads/tmp/${uploadFile.filename}` });
      console.log(err);
      return;
    };
    console.log(req.files);
    let uploadFile = req.files[0];
    res.json({ path: `//uploads/tmp/${uploadFile.filename}` });
  });
})



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
