const envfile = require('./env.js');

const express = require('express');
const ProductRouter = require('./src/features/product/product.routes');
const UserRouter = require('./src/features/user/user.routes');
const bodyparser = require('body-parser');
const jwtAuth = require('./src/middleware/jwt.middleware');
const cartRouter = require('./src/features/cartitem/cartitem.route');
const swagger = require('swagger-ui-express');
const cors = require('cors');

//how to import json file.???
const apiDocs = require('./swagger.json');
// const dotenv = require('dotenv');
const path = require('path');
const loggerMiddleware = require('./src/middleware/logger.middleware');
const { connectToMongodb } = require('./src/config/mongodb');
const orderRouter = require('./src/features/order/order.routes.js');
const connectUsingMongoose = require('./src/config/mongooseConfig.js');
const ApplicationError = require('./src/error-handler/applicationError.js');

//create server....
const server = express();
//collect log for each and every req.
// server.use(loggerMiddleware)
//Set CORS policy. configuration.
// server.use((req,res,next)=>{
//     //preflight is a verification req. can server can respond to it

//     res.header('Access-Control-Allow-Origin','http://localhost:5500');//we u want to give all web client use *
//     res.header('Access-Control-Allow-Headers','Content-Type,Authorization','*');
//     //we have to return OK for preflight req.
//     if(req.method == "OPTIONS"){
//         res.sendStatus(200);
//     }
//     next();
// })

// //to config env variables  allow all env variable
// dotenv.config();//becz of hoisting it willl not able to load url in mongodb so ... store in file env.js

const corsOptions = {
    origin:'http://localhost:5500',
    allowedHeaders:'*',
}
server.use(cors(corsOptions));


server.use(bodyparser.json());//then we can able to get a json data from client.


//to show the api doucmentation of Our app swagger introduced.
server.use(
    "/api-docs",
    swagger.serve,
    swagger.setup(apiDocs));

server.use(express.static(path.join(__dirname, 'public')));


server.use('/api/orders',jwtAuth,orderRouter);

//if there is req stating from "/api/user" or"api/product 
//for all req realated to product redirect to product routes
server.use('/api/products',
    jwtAuth,
    ProductRouter);//why we start req. with api it good practise.

//all api related to cart goes to 
server.use("/api/cartItems",jwtAuth,cartRouter);

//serving users req
server.use('/api/users',UserRouter);

server.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public/static', 'signup.html'));
    } catch (error) {
        console.error("Error sending file:", error);
        res.status(500).send("Internal Server Error");
    }
});


//Error Handler middleware....
server.use((err,req,res,next)=>{
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    console.log(err);
    res.status(503).send(
        'Something went wrong....Please try later.'
    )
    next();
})



//Middleware has to handle 404 request. page not found.
server.use((req,res)=>{
    res.status(404).send("API Not Found.");
})

server.listen(8000, ()=>{
    console.log("Listerning at 8000 port");
    //Database connection- as soon as server start then connect.
    // connectToMongodb();
    connectUsingMongoose();
})