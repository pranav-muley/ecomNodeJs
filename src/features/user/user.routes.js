// manage routes to productController

//import express
const express = require('express');
const UserController = require('./user.controller');
const jwtAuth = require('../../middleware/jwt.middleware');


//initialize router
const router = express.Router();

//
const userController = new UserController();
// user sign up and sign in routes

router.post('/resetPassword',jwtAuth,(req,res)=>{
    userController.resetPassword(req, res);
})

router.post('/signup',(req,res)=>{
    userController.signUp(req, res);
});


router.post('/signin',(req,res)=>{
    userController.signIn(req, res);
})
// router.post('/signin',userController.signIn);


module.exports = router;