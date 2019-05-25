const _ = require('lodash');
require('dotenv').config();

const env = process.env.NODE_ENV || "development";

/**
 * Config for all environments.
 */
const all = {
    db: {
        sqliteFile: './db/rpidb.sqlite'
    },
    bcrypt: {
        saltRounds: 10
    },
    session: {
        secret: process.env.EXP_SESSION_SECRET || 'SessionSecret'
    },
    raspberryPi: {
        name: 'Galileo',
        isRaspberryPi: process.env.IS_RASPBERRY_PI && process.env.IS_RASPBERRY_PI == 'true'
    },
    apiToken: {
        secret: process.env.API_TOKEN_SECRET || 'TokenSecret',
        options: {
            expiresIn: '24h'
        }
    }
}

/**
 * Special config for develpment.
 */
const development = {
    app: {
        port: 3000
    }
};

/**
 * Special config for production
 */
const production = {
    app: {
        port: 80
    }
};

const config = {
    development,
    production
}

module.exports = _.merge(all, config[env]);