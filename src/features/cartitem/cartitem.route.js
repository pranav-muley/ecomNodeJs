

const express = require('express');
const CartItemsController = require('./cartitem.controller');

const cartRouter = express.Router();

const cartController = new CartItemsController();


cartRouter.get('/',(req,res)=>{
    cartController.get(req, res);
});
cartRouter.post('/',(req,res)=>{
    cartController.add(req, res);
});

//use this last becz of /: conside any parameter as it called itself
cartRouter.delete('/:id',(req,res)=>{
    cartController.delete(req, res);
})


module.exports = cartRouter;