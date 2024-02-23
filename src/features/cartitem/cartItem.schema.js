
const mongoose = require("mongoose");

const cartSchema = new Schema({
    productID:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    UserID: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    quantity: Number
})

module.exports = cartSchema;