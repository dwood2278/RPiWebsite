//Login page
exports.index = function (req, res, next) {
    res.render('pages/login/login', { title: 'Login'});
};

//Registration Page
exports.register = function (req, res, next) {
    res.render('pages/login/register', { title: 'Register'});
};

exports.register_post = function (req, res, next) {
    console.log("Request: " + req.body.txtFirstName);
    res.render('pages/login/register', { title: 'Register'});
};