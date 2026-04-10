require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("DB ERROR:", err);
  } else {
    console.log("DB Connected");
  }
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var subCategoryRouter = require('./routes/subcategory');
var brandRouter = require('./routes/brand');
var productRouter = require('./routes/product');
var productDetailRouter = require('./routes/productdetail');
var productPictureRouter = require('./routes/productpicture');
var mainbannerRouter = require('./routes/mainbanner');
var bankandotheroffersRouter = require('./routes/bankandotheroffers');
var adoffersRouter = require('./routes/adoffers');
var smsapi = require('./routes/smsapi');

var adminLoginRouter = require('./routes/adminlogin')
var userinterfaceRouter = require('./routes/userinterface')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin:"https://e-commerce-quick-com-project-fronte.vercel.app"
}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subCategoryRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/productdetail', productDetailRouter);
app.use('/productpicture', productPictureRouter);
app.use('/mainbanner', mainbannerRouter);
app.use('/bankandotheroffers', bankandotheroffersRouter);
app.use('/adoffers', adoffersRouter);
app.use('/smsapi',smsapi);



app.use('/adminlogin', adminLoginRouter);
app.use('/userinterface', userinterfaceRouter);

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
