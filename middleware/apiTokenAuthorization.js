const jwt = require("jsonwebtoken");

//See if the token is valid
exports.hasValidToken = function (req, res, next) {

    let token = req.headers['x-access-token'];

    if (token == undefined) {
        var err = new Error('No token provided.');
        err.status = 401;
        return next(err);
    }

    jwt.verify(token, 'testSecret', function(err, decoded) {
        if (!err) {
            return next();
        } else {
            err.status = 401;
            return next(err);
        }
    });
};

//See if the token is a valid admin token
exports.hasValidAdminToken = function (req, res, next) {

    let token = req.headers['x-access-token'];

    if (token == undefined) {
        var err = new Error('No token provided.');
        err.status = 401;
        return next(err);
    }

    jwt.verify(token, 'testSecret', function(err, decoded) {
        if (!err) {

            //Check if the token is an admin token
            if (decoded.user.isAdmin)
            {
                return next();
            } else {
                var err = new Error('Admin token required.');
                err.status = 401;
                return next(err);
            }
        } else {
            err.status = 401;
            return next(err);
        }
    });
};