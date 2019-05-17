const getSenseHatDataScript =  __dirname + '/get_sense_hat_data.py';
const {PythonShell} = require('python-shell');

const config = require('../config');

var dummySenseHatData = {
    pressure: 993,
    temperature: 21,
    temperatureFromPressure: 21,
    humidity: 30,
    pitch: 0,
    roll: 0,
    yaw: 0,
    cpuTemp: 46
};

exports.getSenseHatData = function () {

    if (config.raspberryPi.isRaspberryPi)
    {
        //Set up python call
        var pyshell = new PythonShell(getSenseHatDataScript, { mode: 'json' });

        //Create promise to wrap python shell call
        return new Promise(function(resolve, reject){

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

    } else {

        return new Promise(function(resolve, reject) {
            resolve(dummySenseHatData);
        });

    }

};