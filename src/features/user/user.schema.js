const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String,maxlength:[25,"Name can't be greater than 25 characters."]},
    email:{type:String,unique:true,required:true,
        match:[/.+\@.+\../,"Please Enter a valid email."]
    },
    password: {type:String,
        //not used beacuse already hashed password while storing in database.
        // validate: function(value){
        //     return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
        // },
        // message:"Password should be between 8-15 cvharacters.";
    },
    type: {type:String,enum:['Customer','Seller']}
})

module.exports = userSchema;