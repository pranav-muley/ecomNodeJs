const mongoose = require("mongoose");
const userSchema = require("./user.schema");
const ApplicationError = require("../../error-handler/applicationError");
const bcrypt = require('bcrypt');
const { ObjectId } = require("mongodb");
//creating model from  schema
const UserModel = mongoose.model('users', userSchema);
console.log(UserModel);
class UserRepository{
    
    async resetPassword(userID,newPassword){
        console.log(userID);
        const hashedPassword = await bcrypt.hash(newPassword, 7)
            .then(userHash=>userHash)
            .catch((err)=>{
                return res.status(400).send("Password not able to hash..")
            });
            console.log(hashedPassword);
        try {
            let user = await UserModel.findById({_id:new ObjectId(userID)});
            console.log(user);
            user.password = hashedPassword;

            user.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went while reseting password repo.",500)
        }
    }

    async signup(user){ 
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong while singup...",500);
        }
    }

    async signin(email,password){
        try {
            // const hashedPassword =  await bcrypt.hash(password, 7)
            //     .then(userHash=>userHash)
            //     .catch((err)=>{
            //         return res.status(400).send("Password not able to hash..")
            //     });
            let user = await UserModel.findOne({email:email},{password:password});
            return user;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong while singin...",500);
        }
    }
}

module.exports = UserRepository;