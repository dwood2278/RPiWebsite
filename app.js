var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var senseHatApiRouter = require('./routes/senseHatApi')

var app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Set up sessions
app.use(session({
    secret: 'SessionSecret',
    resave: false,
    saveUninitialized: false
}));

//Set up static routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'public/images/favicon.ico')));

//Set up routers
app.use('/', indexRouter);
app.use('/sensehatapi', senseHatApiRouter);

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
    res.render('pages/error', {
        title: 'Error',
        session: req.session
    });
});

//Initialize the models on application load.
const { User } = require('./initOrmModels');

module.exports = app;
