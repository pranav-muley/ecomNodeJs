const OrderRepository = require("./order.repository");

class OrderController{
    constructor(){ 
        this.orderRepository = new OrderRepository();
    }
    async placeOrder(req,res,next){
        try {
            const userId = req.userID;
            await this.orderRepository.placeOrder(userId);
            return res.status(201).send("Order Plcaed Successfully.");
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong while placing order...");
        }
    }
}

module.exports = OrderController;