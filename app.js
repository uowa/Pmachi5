var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var kousinrireki = require("./routes/kousinrireki");//更新履歴へのルーティング
var QandA = require("./routes/Q-A");//Q-Aへのルーティング
var link = require("./routes/link");//Q-Aへのルーティング
var dominionrule = require("./routes/dominionrule");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use("/kousinrireki", kousinrireki);//更新履歴へのルーティング?
app.use("/Q-A", QandA);//Q-Aへのルーティング?
app.use("/link", link);//リンク集へのルーティング?
app.use("/dominionrule", dominionrule);


app.use('/', indexRouter);

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
