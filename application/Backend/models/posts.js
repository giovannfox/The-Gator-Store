const db = require('../dbConnection');

/**
 * 
 * @param {String} searchKey give me the string search key from the params
 * @param {String} Category gove me the category coming from req params
 * @returns(Promise) promise returns *[results, fields]*
 */
const searchPostsByCategory = (searchKey, Category = null) => {
    const client = db.client()

    const promiseObject = client.query("SELECT title, description, image, instructor, course, price FROM dev.Posts WHERE `approval_flag`=1 AND (`description` LIKE '%" + searchKey + "%' OR `title` LIKE '% " + searchKey + "%') ORDER BY visits DESC limit 20;")
        .then(([results, fields]) => {
            return {
                searchKey,
                results
            }
        })
        .catch((err) => {
            if (err) throw err
            res.status(500).send(err)
        });

    return promiseObject;
}



module.exports = {
    searchPostsByCategory
}