const UserModel = require("./user.model");
const jwt = require('jsonwebtoken');
// const UserRepository = require("./user.repository");
// const bcrypt = require('bcrypt');
const UserRepository = require("./user.repositoryNew");



class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async resetPassword(req,res){
        const {newPassword} = req.body;
        try {
            let user = await this.userRepository.resetPassword(req.userID,newPassword);
            console.log(user);
            res.status(200).send("password reset Successfully.")
        } catch (err) {
            res.status(201).send("Something went wrong in Resetting Password.");
        }
    }

    async signUp(req,res){
        const {name ,email,password,type} = req.body;
        //asyn func so we have ot wait till it execute.
        
        const user = new UserModel(name,email,password,type);
        const newUser = await this.userRepository.signup(user);
        // console.log(newUser);
        return res.status(201).send(newUser);
    }
    async signIn(req,res){
        // const result = UserModel.signIn(req.body.email,req.body.password);

        const result = await this.userRepository.signin(
            req.body.email,
            req.body.password,
        )
        console.log(result);
        if(!result){
            return res.status(400).send('Incorect creddentials');
        }
        else{
            //1 create token  payload,key,options
            const token = jwt.sign({userID:result._id,
                email:result.email},
                process.env.JWT_SECRET,
                {
                    expiresIn:'1h',
                });
            //2 send token
            return res.status(200).send(token);
        }
    }
}

module.exports = UserController;