const { User } = require('../initOrmModels');

//Login page
exports.login = function (req, res, next) {
    res.render('pages/login', {
        title: 'Login'
    });
};

exports.login_post = function (req, res, next) {

    //Authenticate the user
    User.authenticate(req.body.txtUserName, req.body.txtPassword).then(function(user) {
        if (user != undefined) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.render('pages/login', {
                title: 'Login',
                body: req.body,
                authError: "Invalid username or password."
            });
        }
    });
};

//Registration Page
exports.register = function (req, res, next) {
    res.render('pages/register', { title: 'Register' });
};

exports.register_post = function (req, res, next) {
    
    console.log("Request: " + req.body.txtFirstName);

    //Create the record
    User.create({
        firstName: req.body.txtFirstName,
        lastName: req.body.txtLastName,
        email: req.body.txtEmail,
        userName: req.body.txtUserName,
        password: req.body.txtPassword
    }).then(
        res.render('pages/register', { title: 'Register' })
    );

};