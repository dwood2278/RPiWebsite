const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {  
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            required: false
        },
        lastName: {
            type: DataTypes.STRING,
            required: false
        },
        email: {
            type: DataTypes.STRING,
            required: false
        },
        userName: {
            type: DataTypes.STRING,
            required: true
        }, 
        password: {
            type: DataTypes.STRING,
            required: true
        }
    },{
        hooks: {
            beforeCreate: (user, options) => {
                user.password  = bcrypt.hashSync(user.password, 10);
            },
            beforeBulkCreate: (user, options) => {
                user.password  = bcrypt.hashSync(user.password, 10);
            },
            beforeUpdate: (user, options) => {
                user.password  = bcrypt.hashSync(user.password, 10);
            },
            beforeBulkUpdate: (user, options) => {
                user.password  = bcrypt.hashSync(user.password, 10);
            }
        }
    });

    User.authenticate = function (userName, password) {

        //Wrap it in a promise since this calls async methods.
        return new Promise(function(resolve, reject) {

            User.findOne({ where: { userName: userName } }).then(function(user) {
            
                if (user != undefined) {
                    bcrypt.compare(password, user.password, function(err, authenticated) {
                        if (authenticated) {
                            resolve(user);
                        } else {
                            resolve(undefined);
                        }
                    });
                } else {
                    resolve(undefined);
                }   
            });
        });
    }

    return User;
};