const db = require('../dbConnection');

const insertMessage = async(postId, content)=>{
    const client = db.client()
    try{
        await client.query(
            "INSERT INTO `dev`.`Messages` ( `post_id`, `sender_id`, `content`) VALUES ( '" + postId + "', '" + 32 + "', '" + content+ "');");
    }catch(error){
        console.log(error)
        return false;
    }
    return true;
}

const getMessages=async(userId=32)=>{
    const client =db.client() 

    const[results] = await client.query(
        "SELECT")
}

module.exports = {
    insertMessage
    //getMessages
}