const CartItemModel = require("./cartitem.model");
const CartItemRepository = require("./cartitem.repository");


class CartItemsController {
    constructor(){
        this.cartItemRepository = new CartItemRepository();
    }

    //access userId through token

    add(req,res){
        const {productID,quantity} = req.body;
        const userID = req.userID;
        // console.log("cartiem addinf post userid",userID," ",productID,quantity);
        //add validation for product;

        // ....

        this.cartItemRepository.add(productID,userID,quantity);
        res.status(201).send('Cart is Updated.');
    }

    async get(req,res){
        try{
        const userID = req.userID;
        const productID = req.productID;
        // console.log("USer ID ",req.userID);
        const items = await this.cartItemRepository.get(userID,productID);
        return res.status(200).send(items);
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong in geting cartitem.."); 
        }
    }
    async delete(req,res){
        const userID = req.userID;
        const cartItemID = req.params.id;
        console.log("inside delete",userID);
        const isDeleted = await this.cartItemRepository.delete(cartItemID,userID);
        if(!isDeleted){
            return res.status(404).send("Item Not Found .... ");
        }
        else{
            return res.status(200).send("Item is Removed Successfully...!!!");
        }
        // const items = CartItemModel.getAll();
        // console.log(items);
        // if(items.length == 0){
        //     return res.status(404).send("No found");
        // }
        // else{
        //     return res.status(200).send("Item is Removed...");
        // }
    }
}

module.exports = CartItemsController;