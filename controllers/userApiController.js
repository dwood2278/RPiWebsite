const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../initOrmModels');
const jwt = require("jsonwebtoken");

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

            //Create client safe user and put it into jwt.
            let clientUser = createClientUser(user);
            let payload = {
                user: clientUser
            };
            let token = jwt.sign(payload, 'testSecret', {
                expiresIn: '24h'
            });
            res.json({
                authenticated: true,
                user: clientUser,
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
            clientUserList.push(createClientUser(userList[i]));
        }

        //Send response.
        //
        res.json({
            userList: clientUserList
        });
    });

}

//Creates a user suitable for clients (i.e. no secure information like password)
function createClientUser (user) {
    return {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        isAdmin: user.isAdmin
    }
}