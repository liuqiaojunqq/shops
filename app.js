var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//导入session
var session = require('express-session')
//导入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置session
app.use(session({
  secret: 'userInfo',//自己的session名
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*24 }//存储24小时
}))
//拦截登录
app.get('*',(req,res,next)=>{
  //拦截所有页面，如果不存在username就跳回登陆页面
  let username = req.session.username
  if(req.path!=='/login'&&req.path!=='/register'){
if(!username){
  res.redirect('/login')
}
  }
  next()
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article',articleRouter);

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
