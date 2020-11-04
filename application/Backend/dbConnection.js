const mysql = require('mysql2');

var dbClient = null;

const connect = async () => {
    if (dbClient === null) {
        const pool = mysql.createPool({
            host: "35.163.149.5",
            port: "3306",
            database: "dev",
            user: "dev",
            password: "sYYRyoOuk0Et%3&"
        });

        dbClient = pool.promise();

        console.log("DB Connected!")
    }
}

const client = () => {
    return dbClient
}

const close = () => {
    mysqlssh.close()
    console.log("Closing DB Connection.")
}

module.exports = {
    connect,
    client,
    close
}