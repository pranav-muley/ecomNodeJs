const UserModel = require("../features/user/user.model");
const jwt = require('jsonwebtoken');

const basicAuthorizer = (req,res,next)=>{
    //1 check if authorization header is empty.

    const authHeader = req.headers["authorization"];
    
    if(!authHeader){
        return res.status(404).send("No autherization details found...")
    }

    console.log(authHeader);
    //2 extract credientials. it is encoded in base64
    const base64Credentials = authHeader.replace('Basic','');
    console.log(base64Credentials);

    //3 decode credentials
    const decodedCreds = Buffer.from(base64Credentials,'base64').toString('utf8');
    console.log(decodedCreds);//[username:password]

    const creds = decodedCreds.split(':');


    //check user exits or notl
    const user = UserModel.getAll().find(u=>u.email==creds[0] && u.password == creds[1]);
    if(user){
        next();
    }
    else{
        res.status(401).send('Incorrect Credentials.')
    }

}

module.exports = basicAuthorizer;


/**
 * Encription not done here Encoding and decoding done
 * Endcoding is not safe as much as a Ecription  
 * clent need to store credentials
 * it is easy to creaj credentials 
 * 
 * to overcome this Problem...
 * Json Web Token Used...
 * Encrypted Token.
 * Stateless. -> loose coupled
 * Easy to scale. -> duplicate server easy to work jwt.
 * can be used by mobile and web both
 * 
 * 
 * Structure-
 * Header.Payload.Signature
 * 
 * signIn cred send to server -  server create JWT token. send to client.
 * client send token to authorization header.
 * server verify
 * server send res to client.
 * 
 * 
 * 
 * 
 * JWT payload can be read without secrete key as it is base64-enocoded,not encrypted.
 * However sensitive infor. in payload is not recommended due to security issue.
 * 

*/