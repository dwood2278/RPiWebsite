
var senseHat = require ('../raspberry_pi/senseHat.js');

//Home page of the site.
exports.index = function (req, res, next) {

    //Get promise for sense hat data
    var senseHatDataPromise = senseHat.getSenseHatData(); 

    //Use the promise to render the page on success
    senseHatDataPromise.then(function(result) {
        res.render('pages/index', { title: 'Galileo', senseHatData: result});
    },
    function(err) {
        console.log(err);
    });
};