const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const logger = require('morgan');

const config = require('./config');
const appMiddleware = require('./middleware/appMiddleware');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');
const userApiRouter = require('./routes/userApi');
const senseHatApiRouter = require('./routes/senseHatApi')

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Set up sessions
app.use(session({
    store: new SQLiteStore({
        db: config.session.sqliteFileName,
        dir: config.session.sqliteDirectory
    }),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
}));

//Set up static routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'public/images/favicon.ico')));

//Set global response properties (needs to be before routers)
app.use(appMiddleware.setGlobalResProperties);

//Set up routers
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/userapi', userApiRouter);
app.use('/sensehatapi', senseHatApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(appMiddleware.errorHandler);

//Initialize the models on application load.
const { User } = require('./initOrmModels');

module.exports = app;
