const { ObjectId } = require("mongodb");
const { getDB, getClient } = require("../../config/mongodb");
const OrderModel = require("./order.model");

class OrderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userId){
        const client = getClient();
            const session = client.startSession();
        try {
            
            session.startTransaction();

            const db = getDB();

            //1 get cartItems & calculate total price
            const items = await this.getTotalAmount(userId,session);
            const finalTotalAmount = items.reduce((acc,item)=>{
                acc+item.totalAmount
            },0);
            console.log(finalTotalAmount);
            //2 create an order record.
            const newOrder = new OrderModel(new ObjectId(userId),finalTotalAmount,new Date());
            await db.collection(this.collection).insertOne(newOrder,{session});
            //3 Reduce the stock
            for(let item of items){
                await db.collection("products").updateOne(
                    {_id: item.productID},
                    {$inc:{stock:-item.quantity}},
                    {session}
                )
            }
            //4 clear the cart
            await db.collection("cartItems").deleteMany(
                {userID:new ObjectId(userId)},
                {session}
            )
            session.commitTransaction();
            session.endSession();
            return;
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500)
        }

    }

    async getTotalAmount(userId,session){
        const db = getDB();

        const items = await db.collection("cartItems").aggregate([
            {
                $match:{userId: new ObjectId(userId)}
            },
            //2 get the products from product collection
            {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            //3. retrive all the product from using unwind operator
            {
                $unwind:"$productInfo"
            },
            //4 cal price total
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$prodctInfo.price","$quantity"]
                    }
                }
            }
        ],{session}).toArray();
        console.log(items);
        
    }
}

module.exports = OrderRepository;