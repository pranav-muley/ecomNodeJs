const getDB = require('../../config/mongodb');
const ApplicationError = require('../../error-handler/applicationError');

class UserModel{
    constructor(name,email,password,type){
        this.email = email;
        this.name = name;
        this.password = password;
        this.type = type;
        // this._id = id;
    }

    
    // static async signUp(name,email,password,type){
    //     try{
    //         // 1. Get the Database
    //         const db = getDB();
    //         // 2. get the Collection
    //         const collection = db.collection("users")

    //         const newUser = new UserModel(name,email,password,type);
    //         // newUser.id = users.length+1;
    //         // users.push(newUser);

    //         // 3. to insert the document;
    //        await collection.insertOne(newUser);
    //        return newUser;
    //     }catch(err){
            
    //         throw new ApplicationError("Someting went wrong while adding new data to mongoDb",500)
    //     }

        
    // } moved to user repos.

    static signIn(email,password){
        const user = users.find(u => u.password == password && u.email == email);
         if(!user){
            return "Not Found!!!";
         }
         return user;
    }

    static getAll(){
        return users;
    }
}

let users = [
    {
        id:1,
        name:"Admin User",
        email:"seller@ecom.com",
        password:"Password1",
        type:'seller'
    },
    {
        id:2,
        name:"Admin User",
        email:"customer@ecom.com",
        password:"Password1",
        type:'customer',
    },
]

module.exports = UserModel;