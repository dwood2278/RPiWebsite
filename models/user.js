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
    });
    return User;
};