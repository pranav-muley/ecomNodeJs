const mongodb = require('mongodb');
// const dotenv = require('dotenv');
// //config - need in every file; so to avodi move config at top in server another way is create new file and move thsi statement 
// dotenv.config();

const url = process.env.DB_URL;

let client;
const connectToMongodb = ()=>{
    mongodb.MongoClient.connect(url)
        .then(clientInstance=>{
            client = clientInstance;
            console.log("MongoDB is Connected...");
            createCounter(client.db());
            createIndexes(client.db());
            // return;
        })
        .catch((err)=>{
            console.log("faailed to load database....",err);
        })
    
}

const getClient = ()=>{
    return client;
}

const getDB=()=>{
    console.log("Connecting to database...");
    return client.db();
}

const createCounter = async(db)=>{
    const existingCounter = await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId',values:0});
    }
}

const createIndexes = async(db)=>{
    try{
        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1,category:-1});
        await db.collection("products").createIndex({desc:"text"});

        console.log("Index are created!!!!!");
    }
    catch(err){
        console.log("Someting went wrong while creating indexing",err);
    }
}

module.exports = {connectToMongodb,getDB,getClient};