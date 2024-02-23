const express = require("express");
const OrderController = require("./order.controller");

//initialize express router
const orderRouter = express();

const orderController = new OrderController();

orderRouter.post('/',(req,res,next)=>{
    orderController.placeOrder(req, res, next);
})

module.exports = orderRouter;