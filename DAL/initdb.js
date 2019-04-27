const sqlite3 = require('sqlite3').verbose();

exports.verifyAndInitDatabase = function () {
    let db = new sqlite3.Database('./db/rpidb.sqlite', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to database.');

        createUserTable(db);
    
        createAdminUser(db);

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });

    });
};

//Creates the user table if it doesn't exist
function createUserTable (db) {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            email text,
            username text NOT NULL UNIQUE,
            password text NOT NULL UNIQUE
        );
    `);

}

//Creates the admin user if it does not exist
function createAdminUser(db) {

    //See if the admin user exists
    db.get(`
        SELECT id
        FROM users
        WHERE username = 'admin'
        `, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row == undefined) {
                //The admin user does not exist, so we need to create it
                db.run(`
                    INSERT INTO users (
                        firstName,
                        lastName,
                        email,
                        username,
                        password
                    ) VALUES (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )
                `, ['Admin', 'User', '', 'admin', 'admin'], function(err) {
                    if (err) {
                      return console.log(err.message);
                    }
                });
                console.log(`Add admin user`)
            }
       
        });
}