const { User } = require('../initOrmModels');

//Login page
exports.login = function (req, res, next) {
    //Check if the user is logged in
    if(req.session.user) {
        //Redirect to home since user is logged in.
        res.redirect('/');
    } else {
        res.render('pages/login', {
            title: 'Login',
            session: req.session
        });
    }
};

exports.login_post = function (req, res, next) {

    //Authenticate the user
    User.authenticate(req.body.txtUserName, req.body.txtPassword).then(function(user) {
        if (user != undefined) {
            req.session.user = user;
            if (req.session.loginRedirectUrl) {
                var redirectUrl = req.session.loginRedirectUrl;
                req.session.loginRedirectUrl = undefined;
                res.redirect(redirectUrl);
            } else {
                res.redirect('/');
            }
        } else {
            res.render('pages/login', {
                title: 'Login',
                session: req.session,
                body: req.body,
                errorMessage: "Invalid username or password."
            });
        }
    });
};

//Password change page.
exports.changePassword = function (req, res, next) {
    res.render('pages/changePassword', {
        title: 'Change Password',
        session: req.session
    });
}

exports.changePassword_post = function (req, res, next) {

    User.findByPk(req.session.user.id).then(user => {
        //Verify the password
        user.verifyPassword(req.body.txtCurrentPassword).then(function(isPasswordVerified) {
            if (isPasswordVerified){
                user.update({
                    password: req.body.txtNewPassword
                }).then(user => {
                    res.render('pages/changePassword', {
                        title: 'Change Password',
                        session: req.session,
                        passwordChangeSuccess: true
                    });
                });
            } else {
                res.render('pages/changePassword', {
                    title: 'Change Password',
                    session: req.session,
                    errorMessage: "Invalid current password."
                });
            }
        });
    });
}

//Logout (no page, redirects to login)
exports.logout = function (req, res, next) {
    if (req.session) {
        //Logout by destroying the session
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/login');
            }
        });
    }
}

//Create user page
exports.createUser = function (req, res, next) {
    res.render('pages/createUser', {
        title: 'Create User',
        session: req.session
     });
};

exports.createUser_post = function (req, res, next) {

    //Create the record
    User.create({
        firstName: req.body.txtFirstName,
        lastName: req.body.txtLastName,
        email: req.body.txtEmail,
        userName: req.body.txtUserName,
        password: req.body.txtPassword
    }).then(
        res.render('pages/createUser', {
            title: 'Create User',
            session: req.session
        })
    );

};