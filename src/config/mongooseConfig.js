const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.DB_URL;

const connectUsingMongoose = async()=>{
    try {
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Mongodb connected using mongoose.");
    } catch (err) {
        console.log("Error while connectiong using mongoose",err);

    }
}

module.exports = connectUsingMongoose;