const db = require('../dbConnection');

/*
    Inserts a message into out databases
*/

const insertMessage = async (postId, content, sender_id) => {
    const client = db.client()
    try {
        await client.query(
            "INSERT INTO `dev`.`Messages` ( `post_id`, `sender_id`, `content`) VALUES ( '" + postId + "', '" + sender_id + "', '" + content + "');");
    } catch (error) {
        console.log(error)
        return false;
    }
    return true;
}
/*
* Returns all Messages that where sent to this userID 
*/

const getMessagesBySellerId = async (userId) => {
    const client = db.client()

    const promiseObject = client.query("SELECT Messages.id as message_id, post_id, sender_id from Messages JOIN Posts P on P.id = Messages.post_id JOIN Users U on U.id = Messages.sender_id WHERE P.user_id = '" + userId + "';")
        .then(([results, _fields]) => {
            return {
                results
            }
        })
        .catch((err) => {
            console.log(err)
            if (err) throw err
            res.status(500).send(err)
        });
    return promiseObject;
}


/*
* returns all the messages sent by this user 
*/

const getMessagesByBuyerId = async (userId) => {
    const client = db.client()

    const promiseObject = client.query("SELECT Message.content AND User.email as message_id, post_id, sender_id from Messages JOIN Posts P on P.id = Messages.post_id JOIN Users U on U.id = Messages.sender_id WHERE sender_id = '" + userId + "';")
        .then(([results, _fields]) => {
            return {
                results
            }
        })
        .catch((err) => {
            console.log(err)
            if (err) throw err
            res.status(500).send(err)
        });
    return promiseObject;
}

const getMessagesByMessageId  = async(messageId)=>{
    const client = db.client()
    const promiseObject = client.query("SELECT Messages.content FROM Messages WHERE Messages.id ='"+ messageId + "';")
        .then(([results, _fields]) => {
            return {
                results
            }
        })
        .catch((err) => {
            console.log(err)
            if (err) throw err
            res.status(500).send(err)
        });
    return promiseObject;
}

module.exports = {
    insertMessage,
    getMessagesBySellerId,
    getMessagesByBuyerId,
    getMessagesByMessageId
}