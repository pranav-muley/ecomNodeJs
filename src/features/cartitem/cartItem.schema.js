const { default: mongoose } = require("mongoose");


const cartSchema = new mongoose.Schema({
    productID:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    UserID: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    quantity: Number,
})

module.exports = cartSchema;