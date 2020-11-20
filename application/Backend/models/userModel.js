const bcrypt = require("bcrypt");
const db = require('../dbConnection');

/**
 * 
 * @param {String} userEmail user email to be looked up.
 * @returns {Boolean} true if query return any result else false
 */
const userExists = async (userEmail) => {
    const client = db.client()
    const [results] = await client.query("SELECT count(email) as count FROM dev.Users WHERE LOWER(dev.Users.email) = LOWER(' " + userEmail + "');");

    if (results[0].count > 0)
        return true
    else
        return false;
}

const insertUser = async (email, password, firstName = null, lastName = null) => {
    const client = db.client()
    password = await bcrypt.hash(password, 10)

    const results = await client.query(
        "INSERT INTO `dev`.`Users` ( `email`, `password`, `firstName`, `lastName`) VALUES ( '" + email + "', '" + password + "', '" + firstName + "', '" + lastName + "');")

    console.log('results :>> ', results);

}

module.exports = {
    userExists,
    insertUser
}