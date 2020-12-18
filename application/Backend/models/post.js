const db = require('../dbConnection');

/**
 * 
 * @param {String} searchKey give me the string search key from the req query
 * @param {String} Category give me the category coming from req query
 * @returns(Promise) promise that returns *{ searchKey: String, results: [results, fields] }*
 */
const searchPostsByCategory = (searchKey, Category = null) => {
    const client = db.client()
    const promiseObject = client.query("SELECT `Posts`.id, title, image, instructor, course, price FROM dev.Posts  JOIN dev.Categories on dev.Posts.`category_id`= dev.Categories.`ID` WHERE `approval_flag`=1 AND `Category` LIKE '%" + Category + "%' AND (`title` LIKE '%" + searchKey + "%' OR `description` LIKE '%" + searchKey + "%' OR `instructor` LIKE '%" + searchKey + "%' OR `course` LIKE '%" + searchKey + "%') ORDER BY visits DESC limit 20;")
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

    const promiseObject = client.query("SELECT `Posts`.id, title, image, instructor, course, price FROM dev.Posts WHERE `approval_flag`=1 ORDER BY visits DESC limit 20;")
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

    const [results] = await client.query("SELECT `Posts`.id,  title, description, image, instructor, course, price FROM dev.Posts WHERE `ID` = " + postId + " ;");

    if (!results[0]) throw results

    return results[0];
}

/**
 *
 * @param {Object} postInfo Contains title, description, image, & price of post
 * @returns true if successful or false if not
 */
const createPost = async(title,category,price,description,image,userId)=>{
    const client = db.client()
    try{
        await client.query(
            "INSERT INTO `Posts` (`title`, `category_id`, `price`, `description`, `image`,`user_id`) VALUES ('"+title+"','"+category+"','"+price+"','"+description+"','"+image+"','"+userId+"');");
    }catch(error){
        console.log(error)
        return false;
    }
    return true
}

module.exports = {
    searchPostsByCategory,
    getPosts,
    getPostDetails,
    createPost
}