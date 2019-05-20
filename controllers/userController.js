const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../initOrmModels');
const jwt = require("jsonwebtoken");

const config = require('../config');

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

            //Remove the password for things that make it to the client
            user.password = '';

            //Load the user into session.
            req.session.user = user;

            let payload = {
                user: user
            };
            let token = jwt.sign(payload, config.apiToken.secret, config.apiToken.options);

            res.cookie('RPiWebsite_token', token, {maxAge: 86400000});
            res.cookie('RPiWebsite_user', JSON.stringify(user), {maxAge: 86400000});

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
                body: req.body,
                errorMessage: "Invalid username or password."
            });
        }
    });
};

//Logout (no page, redirects to login)
exports.logout = function (req, res, next) {
    if (req.session) {
        //Logout by destroying the session
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                res.clearCookie("RPiWebsite_token");
                res.clearCookie('RPiWebsite_user');
                return res.redirect('/login');
            }
        });
    }
}

//Password change page.
exports.changePassword = function (req, res, next) {
    res.render('pages/changePassword', {
        title: 'Change Password'
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
                    req.session.user = user;
                    res.render('pages/changePassword', {
                        title: 'Change Password',
                        passwordChangeSuccess: true
                    });
                });
            } else {
                res.render('pages/changePassword', {
                    title: 'Change Password',
                    errorMessage: "Invalid current password."
                });
            }
        });
    });
}

//Edit the user profile
exports.editUser = function (req, res, next) {
    res.render('pages/editUser', {
        title: 'Edit User',
    });
}

exports.editUser_post = function (req, res, next) {

    //Verify the username isn't taken by someone else.
    User.count({
        where: {
            userName: req.body.txtUserName,
            [Op.not]: {
                id: req.session.user.id
            }
        }
    }).then(count => {
        if (count == 0 ){

            //No users match, update the record
            User.findByPk(req.session.user.id).then(user => {

                user.update({
                    firstName: req.body.txtFirstName,
                    middleName: req.body.txtMiddleName,
                    lastName: req.body.txtLastName,
                    email: req.body.txtEmail,
                    userName: req.body.txtUserName
                }).then(user => {
                    req.session.user = user;
                    res.render('pages/editUser', {
                        title: 'Edit User',
                        userChangeSuccess: true
                    });
                });
            });
        } else {
            // at least one user matches, display error.
            res.render('pages/editUser', {
                title: 'Edit User',
                session: req.session,
                errorMessage: "The username &quot;" + req.body.txtUserName + "&quot; is already taken, please choose another."
            });
        }
    });
}

//Manage Users page
exports.manageUsers = function (req, res, next) {

    //Fetch all users and pass them to the page.
    User.findAll().then( userListFromDb => {

        var userList = [];

        //Loop through the users and create user records for the display
        userListFromDb.forEach(function(userFromDb) {
            userList.push({
                id: userFromDb.id,
                firstName: userFromDb.firstName,
                middleName: userFromDb.middleName,
                lastName: userFromDb.lastName,
                email: userFromDb.email,
                userName: userFromDb.userName, 
                isAdmin: userFromDb.isAdmin
            });
        });
        
        res.render('pages/manageUsers', {
            title: 'Manage Users',
            userListJson: JSON.stringify(userList)
         });

    }); 
}

//Create user page
exports.createUser = function (req, res, next) {
    res.render('pages/createUser', {
        title: 'Create User'
     });
};

exports.createUser_post = function (req, res, next) {

    //Create the record
    User.create({
        firstName: req.body.txtFirstName,
        lastName: req.body.txtLastName,
        email: req.body.txtEmail,
        userName: req.body.txtUserName,
        password: req.body.txtPassword,
        isAdmin: req.body.chkIsAdmin
    }).then(
        res.render('pages/createUser', {
            title: 'Create User',
            createUserSuccess: true
        })
    );

};
