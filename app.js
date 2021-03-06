var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
//var cdkey = require('./routes/(delete)2');
var paypal = require('./routes/paypal');
//var cdkeyf = require('./routes/(delete)4');
var api = require('./routes/api');
//var cdkeyc = require('./routes/(delete)3');
//var cdkeys = require('./routes/(delete)1');
var cdkeyd = require('./routes/cdkeyd');
var cdkeyf1 = require('./routes/cdkeyf1');
var cdkeywwe = require('./routes/cdkeywwe');
var app = express();


// 加载hbs模块
var hbs = require('hbs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.text({ type: 'x-www-form-urlencoded' }))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/cdkeyf', cdkeyf);
//app.use('/cdkeyc', cdkeyc);
//app.use('/cdkeys', cdkeys);
//app.use('/cdkey', cdkey);

app.use('/', routes);
app.use('/users', users);
app.use('/paypal', paypal);
app.use('/api/cdkeyd', cdkeyd);
app.use('/api/cdkeyf1', cdkeyf1);
app.use('/api/cdkeywwe', cdkeywwe);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
//module.exports = app;
