//Login page
exports.index = function (req, res, next) {
    res.render('pages/login/login', { title: 'Raspberry Pi Galileo'});
};