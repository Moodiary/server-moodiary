var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup'); // 회원가입 라우터
var loginRouter = require('./routes/login');  //로그인 라우터
var findidRouter = require('./routes/findid'); // 아이디찾기 라우터
var findpwRouter = require('./routes/findpw'); // 비밀번호찾기 라우터
var changepwRouter = require('./routes/changepw'); // 비밀번호 변경 라우터
var deleteuserRouter = require('./routes/deleteuser'); // 회원탈퇴 라우터

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 사용 정의
app.use('/', indexRouter);
app.use('/user', signupRouter);
app.use('/user', loginRouter);
app.use('/user', findidRouter);
app.use('/user', findpwRouter);
app.use('/user', changepwRouter);
app.use('/user', deleteuserRouter);


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

//module.exports = app;
app.listen(3000);