var getSenseHatDataScript =  __dirname + '/get_sense_hat_data.py';
const {PythonShell} = require('python-shell');

exports.getSenseHatData = function () {

    //Set up python call
    var pyshell = new PythonShell(getSenseHatDataScript, { mode: 'json' });

    //Create promise to wrap python shell call
    var senseHatDataPromise = new Promise(function(resolve, reject){
        pyshell.on('message', function (message) {
            resolve(message);
        });
        
        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
            if (err){
                reject(err);
            };
        });
    });

    return senseHatDataPromise;

};