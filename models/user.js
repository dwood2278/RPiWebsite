const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {  
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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

        console.log('Authenticate');

        /*const user = User.findOne({ where: { userName: userName } });

        if (bcrypt.compareSync(password, user.password)) {
            return user;
        } else {
            return null;
        }*/
    }

    return User;
};