const db = require('../dbConnection');

/**
 * 
 * @param {String} searchKey give me the string search key from the req query
 * @param {String} Category give me the category coming from req query
 * @returns(Promise) promise that returns *{ searchKey: String, results: [results, fields] }*
 */
const searchPostsByCategory = (searchKey, Category = null) => {
    const client = db.client()
    const promiseObject = client.query("SELECT ID, title, image, instructor, course, price FROM dev.Posts  JOIN dev.Categories on dev.Posts.`category_id`= dev.Categories.`ID` WHERE `approval_flag`=1 AND `Category` LIKE '%" + Category + "%' AND (`title` LIKE '%" + searchKey + "%' OR `description` LIKE '%" + searchKey + "%') ORDER BY visits DESC limit 20;")
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

/**
 * Returns the 20 most visited items
 * @returns(Promise) promise that returns *{ searchKey: String, results: [results, fields] }*
 */
const getPosts = () => {
    const client = db.client()

    const promiseObject = client.query("SELECT title, image, instructor, course, price FROM dev.Posts WHERE `approval_flag`=1 ORDER BY visits DESC limit 20;")
        .then(([results, fields]) => {
            return {
                searchKey: null,
                results
            }
        })
        .catch((err) => {
            if (err) throw err
            res.status(500).send(err)
        });

    return promiseObject;
}

/**
 * 
 * @param {String} postId post Id
 * @returns The post details.
 */
const getPostDetails = async (postId) => {
    const client = db.client()

    const [results] = await client.query("SELECT ID,  title, description, image, instructor, course, price FROM dev.Posts WHERE `ID` = " + postId + " ;");

    if (!results[0]) throw results

    return results[0];
}

module.exports = {
    searchPostsByCategory,
    getPosts,
    getPostDetails
}