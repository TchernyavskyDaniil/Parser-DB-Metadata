/**
 *          SQL executor
 */
const sqlite3 = require('sqlite3').verbose();
var db = null;


module.exports.connect = function connect(dbname) {
    db = new sqlite3.Database('./db/'+dbname+'.db',
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database : ' + dbname);

    });
};

module.exports.disconnect = function disconnect() {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};

/**
 * executing sql queries
 * @param sql
 */
module.exports.execute = function execute(sql) {
    db.run(sql);
};
