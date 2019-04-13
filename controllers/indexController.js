
var senseHat = require ('../raspberry_pi/senseHat.js');

//Home page of the site.
exports.index = function (req, res, next) {
    res.render('pages/index', { title: 'Galileo'});
};