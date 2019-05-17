require('dotenv').config();

const env = process.env.NODE_ENV || "development";

const development = {
    app: {
        port: 3000
    },
    db: {
        sqliteFile: './db/rpidb.sqlite'
    },
    bcrypt: {
        saltRounds: 10
    },
    session: {
        sessionSecret: process.env.EXP_SESSION_SECRET || 'SessionSecret'
    },
    raspberryPi: {
        name: 'Galileo',
        isRaspberryPi: process.env.IS_RASPBERRY_PI && process.env.IS_RASPBERRY_PI == 'true'
    }
};

const production = {
    app: {
        port: 80
    },
    db: {
        sqliteFile: './db/rpidb.sqlite'
    },
    bcrypt: {
        saltRounds: 10
    },
    session: {
        sessionSecret: process.env.EXP_SESSION_SECRET || 'SessionSecret'
    },
    raspberryPi: {
        name: 'Galileo',
        isRaspberryPi: process.env.IS_RASPBERRY_PI && process.env.IS_RASPBERRY_PI == 'true'
    }
};

const config = {
    development,
    production
}

module.exports = config[env];