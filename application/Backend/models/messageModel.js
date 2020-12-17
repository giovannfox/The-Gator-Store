const db = require('../dbConnection');

/*
    Inserts a message into out databases
*/

const insertMessage = async(postId,content,sender_id)=>{
    const client = db.client()
    try{
        await client.query(
            "INSERT INTO `dev`.`Messages` ( `post_id`, `sender_id`, `content`) VALUES ( '" + postId + "', '" + sender_id + "', '" + content+ "');");
    }catch(error){
        console.log(error)
        return false;
    }
    return true;
}

/*
const getMessages=async(userId=32)=>{
    const client =db.client() 

    const promiseObject = client.query(
        "SELECT Messages.* FROM Messages JOIN Users ON Messages.`sender_id`= "+userId+"")
            .then(([results,fields])=>{
                return{
                    results
                }
            })
            .catch((err)=>{
                console.log(err)
                if(err) throw err
                    res.status(500).send(err)
             });
    return promiseObject;
}
*/

module.exports = {
    insertMessage,
    //getMessages
}