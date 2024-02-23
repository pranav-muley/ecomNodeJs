const { getDB } = require("../../config/mongodb");
const ApplicationError = require("../../error-handler/applicationError");
const bcrypt = require('bcrypt');
class UserRepository{

    async signUp(newUser){
        
        try{
            // 1. Get the Database
            const db = getDB();
            // 2. get the Collection
            const collection = db.collection("users")
            // console.log(newUser);
            const newPassword = await bcrypt.hash(newUser.password, 7)
                .then(userHash=>userHash)
                .catch((err)=>{
                    return res.status(400).send("Password not able to hash..")
                });
            // 3. to insert the document;
            newUser.password = newPassword;
           await collection.insertOne(newUser);
           return newUser;
        }catch(err){
            console.log(err);
            // throw new ApplicationError("Someting went wrong while adding new data to mongoDb",500);
        }
    }
    async signIn(email,password){
        try {
            //1 get the database.
            const db = getDB();
            //2 get the collection
            const collection = db.collection("users");
            
            //search hash password
            let user = await collection.findOne({email});
            if(user){

                var isMatch = await bcrypt.compare(password,user.password).then((res)=> true).catch((err)=>{console.log(err);});
                console.log(isMatch,"is matching...");
                if(isMatch){
                    // 3 finding document
                    console.log("email is ",email,"pass:" ,password);
                    return await collection.findOne({email,password:user.password});
                }
                else{
                    throw ApplicationError("Invalid Credentials",400);
                }
            }
            

        } catch (err) {  
            console.log(err);            
            // throw new ApplicationError(err,"Someting went wrong while signin mongoDb",500);

        }
    }
}

module.exports = UserRepository;