const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categorySchema = require("../features/product/category.schema");

dotenv.config();
const url = process.env.DB_URL;

const connectUsingMongoose = async()=>{
    try {
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Mongodb connected using mongoose.");
        addCategories();
    } catch (err) {
        console.log("Error while connectiong using mongoose",err);

    }
}

async function addCategories () {
    const CategoryModel = mongoose.model('Category',categorySchema);
    const categories = await CategoryModel.find();
    if(!categories || categories.length==0){
        await CategoryModel.insertMany([{name:'Books'},{name:'Clothing'},{name:'Electronics'}])
    }
    console.log("Categories added Successfully!!!!");
}


module.exports = connectUsingMongoose;