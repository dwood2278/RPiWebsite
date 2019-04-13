
var senseHat = require ('../raspberry_pi/senseHat.js');

// Return SenseHatData as JSON
exports.getSenseHatData = function (req, res, next) {

    //Get promise for sense hat data
    var senseHatDataPromise = senseHat.getSenseHatData(); 

    //Use the promise to render the page on success
    senseHatDataPromise.then(function(result) {
        res.json(result);
    },
    function(err) {
        console.log(err);
    });
};