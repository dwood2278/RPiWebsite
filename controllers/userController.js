const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../initOrmModels');
const jwt = require("jsonwebtoken");

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
                user: req.session.user,
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
                return res.redirect('/login');
            }
        });
    }
}

//Password change page.
exports.changePassword = function (req, res, next) {
    res.render('pages/changePassword', {
        title: 'Change Password',
        user: req.session.user
    });
}

exports.changePassword_post = function (req, res, next) {

    User.findByPk(req.session.user.id).then(user => {
        //Verify the password
        user.verifyPassword(req.body.txtCurrentPassword).then(function(isPasswordVerified) {
            if (isPasswordVerified){
                user.update({
                    password: User.hashPassword(req.body.txtNewPassword)
                }).then(user => {
                    req.session.user = user;
                    res.render('pages/changePassword', {
                        title: 'Change Password',
                        user: req.session.user,
                        passwordChangeSuccess: true
                    });
                });
            } else {
                res.render('pages/changePassword', {
                    title: 'Change Password',
                    user: req.session.user,
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
        user: req.session.user
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
                        user: req.session.user,
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
            user: req.session.user,
            userListJson: JSON.stringify(userList)
         });

    }); 
}

//Create user page
exports.createUser = function (req, res, next) {
    res.render('pages/createUser', {
        title: 'Create User',
        user: req.session.user
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
            user: req.session.user
        })
    );

};

exports.authenticate = function (req, res, next) {

    //Check that the username and password are not undefined
    if (req.body.userName == undefined ||
        req.body.password == undefined) {
        res.json({
            authenticated: false
        });
    }

    //Authenticate the user
    User.authenticate(req.body.userName, req.body.password).then(function(user) {
        if (user != undefined) {

            //Create a user with only the necessary values
            var returnUser = {
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName
            }

            const payload = {
                user: returnUser
            };
            let token = jwt.sign(payload, 'testSecret', {
                expiresIn: '24h'
            });
            res.json({
                authenticated: true,
                user: returnUser,
                token: token
            });
        } else {
            res.json({
                authenticated: false,
            });
        }
    });
}