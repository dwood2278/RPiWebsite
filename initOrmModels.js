const UserModel = require('./models/user');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/rpidb.sqlite'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
})

//See if we hav an admin user. If not create it.
User.count({ where: { userName: 'admin' } }).then(count => {
    if (count == 0) {
        User.create({  
            firstName: 'Admin',
            lastName: 'User',
            userName: 'admin',
            password: 'admin',
            isAdmin: true
        })
        .then(newUser => {
            console.log(`New user ${newUser.userName} has been created.`);
        });
    }
});

module.exports = {
    User
}