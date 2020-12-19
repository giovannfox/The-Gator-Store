const bcrypt = require("bcrypt");
const db = require('../dbConnection');

/**
 * 
 * @param {String} userEmail user email to be looked up.
 * @returns {Boolean} true if query return any result else false
 */
const userExists = async (userEmail) => {
    const client = db.client()
    const [results] = await client.query("SELECT count(email) as count FROM Users WHERE LOWER(Users.email) = LOWER(' " + userEmail + "');");

    if (results[0].count > 0)
        return true
    else
        return false;
}

/**
 * 
 * @param {String} email Email to be inserted.
 * @param {String} password Password NOT HASHED
 * @param {String} firstName User first name
 * @param {String} lastName User last name
 */
const insertUser = async (email, password, firstName = null, lastName = null) => {
    const client = db.client()
    password = await bcrypt.hash(password, 10)

    try {
        await client.query(
            "INSERT INTO Users ( email, password, firstName, lastName) VALUES ( '" + email + "', '" + password + "', '" + firstName + "', '" + lastName + "');")
    } catch (error) {
        if (error.message.includes("Duplicate")){
            return "duplicate entry"
        }
    }
    return true    
}


const getUser = async (email, password = null) => {
    const client = db.client()

    const [results] = await client.query(
        "SELECT id, email, password, firstName, lastName FROM Users WHERE email = '" + email + "';")

    // console.log('results :>> ', results);
    return results[0]

}

module.exports = {
    userExists,
    insertUser,
    getUser
}