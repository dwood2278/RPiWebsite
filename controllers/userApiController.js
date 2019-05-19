const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../initOrmModels');
const jwt = require('jsonwebtoken');

const config = require('../config');

exports.getToken = function (req, res, next) {

    //Check that the username and password are not undefined
    if (req.body.userName == undefined ||
        req.body.password == undefined) {
        res.json({
            authenticated: false
        });
    }

    //Authenticate the user
    User.authenticate(req.body.userName, req.body.password).then(user => {
        if (user != undefined) {

            //Remove password and put user into jwt.
            user.password = '';

            let payload = {
                user: user
            };
            let token = jwt.sign(payload, config.apiToken.secret, config.apiToken.options);
            res.json({
                authenticated: true,
                user: user,
                token: token
            });
        } else {
            res.json({
                authenticated: false,
            });
        }
    });
}

exports.getAllUsers = function (req, res, next) {

    User.findAll().then(userList => {
        
        var clientUserList = [];

        //Loop through all users and return the client version of them.
        for (var i = 0; i < userList.length; i++) {
            userList[i].password = '';
            clientUserList.push(userList[i]);
        }

        //Send response.
        //
        res.json({
            userList: clientUserList
        });
    });

}

exports.getUser = function (req, res, next) {

    //Get the user ID
    var userId = req.params.userId;

     //Get the user
     User.findByPk(userId).then(user => {
         user.password = '';
         res.json({
             user: user
         });
     })
     .catch(function(err) {
         res.json({
             errorMessage: err
         });
     });

}

exports.verifyPassword = function (req, res, next) {

    //Get the user ID
    var userId = req.params.userId;

    //Get the user
    User.findByPk(userId).then(user => {
         //Verify the current password
         user.verifyPassword(req.body.password).then(isPasswordVerified => {
            res.json({
                isPasswordVerified: isPasswordVerified
            });
        });
    })
    .catch(function(err) {
        res.json({
            errorMessage: err
        });
    });
}

exports.changePassword = function(req, res, next) {

    //Get the user ID
    var userId = req.params.userId;

    //Get the user
    User.findByPk(userId).then(user => {

        //Verify the current password
        user.verifyPassword(req.body.currentPassword).then(isPasswordVerified => {
            if (isPasswordVerified) {
                //Password verified, update the user
                user.update({
                    password: req.body.newPassword
                })
                .then(user => {
                    //Sucessfully updated the password
                    res.json({
                        successfullyChangedPassword: true,
                    });
                })
                .catch(function(err) {
                    res.json({
                        errorMessage: err
                    });
                });

            } else {
                res.json({
                    successfullyChangedPassword: false,
                    errorMessage: 'Invalid current password.'
                });
            }
        });
    })
    .catch(function(err) {
        res.json({
            errorMessage: err
        });
    });

}

exports.updateUser = function (req, res, next) {

    //Get the token so we can use it to check user data.
    let token = req.headers['x-access-token'];

    jwt.verify(token, config.apiToken.secret, function(err, decoded) {
        if (!err) {
            //Get the user ID
            var userId = req.params.userId;

            //Get the user and update it.
            User.findByPk(userId).then(user => {

                //Verify that the user is not trying to alter any properties that they should not.
                if (user.userName == 'admin' && 
                    req.body.userName != undefined &&
                    req.body.userName != 'admin') {
                    
                    //Cannot alter username of admin
                    res.json({
                        errorMessage: 'Cannot change username for admin user.'
                    });
                } else if (user.userName == 'admin' && 
                           req.body.isAdmin != undefined &&
                           !req.body.isAdmin) {
                    
                    //Cannot set admin user to not be an admin
                    res.json({
                        errorMessage: 'Cannot change admin user to not be an admin.'
                    });

                } else if (decoded.user.id == userId && 
                           req.body.isAdmin != undefined &&
                           decoded.user.isAdmin != req.body.isAdmin) {

                    //Cannot change isAdmin property of self.
                    res.json({
                        errorMessage: 'Cannot change admin status of current user.'
                    });

                } else {
                    //All checks passed, update the user
                    user.update(req.body).then(user => {
                        user.password = '';
                        res.json({
                            user: user
                        });
                    })
                    .catch(function(err) {
                        res.json({
                            errorMessage: err
                        });
                    });
                }
            })
            .catch(function(err) {
                res.json({
                    errorMessage: err
                });
            });
        } else {
            res.json({
                errorMessage: err
            });
        }
    });
}
