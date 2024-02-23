

const express = require('express');
const CartItemsController = require('./cartitem.controller');

const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.delete('/:id',(req,res)=>{
    cartController.delete(req, res);
})
cartRouter.get('/',(req,res)=>{
    cartController.get(req, res);
});
cartRouter.post('/',(req,res)=>{
    cartController.add(req, res);
});


module.exports = cartRouter;