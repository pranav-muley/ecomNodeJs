const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:String,
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products'
        }
    ]
})

module.exports = categorySchema;