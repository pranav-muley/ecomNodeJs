const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }
    ,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rating:Number
})

module.exports = reviewSchema;