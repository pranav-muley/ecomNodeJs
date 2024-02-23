const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price:Number,
    category:String,
    desc:String,
    inStock:Number
})

module.exports = productSchema;