const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price:Number,
    category:String,
    desc:String,
    inStock:Number,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    categories:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
})

module.exports = productSchema;