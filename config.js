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
};

const config = {
    development,
    production
}

module.exports = config[env];