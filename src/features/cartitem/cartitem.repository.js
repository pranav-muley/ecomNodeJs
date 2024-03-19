const { ObjectId } = require('mongodb');
const {getDB} = require('../../config/mongodb');
const { default: mongoose } = require('mongoose');
const cartSchema = require('./cartItem.schema');

class CartItemRepository{
    constructor(){
        this.collection = "cartItems"
    }

    async add(productID,userID,quantity){
        try{
            
            //get database
            // const db = getDB();
            // //get collection
            // const collection = db.collection(this.collection);

            const cartModel = await mongoose.model("cartItems",cartSchema);
            // const id = await this.getNextCounter(db);
            console.log(cartModel);
            const isPresent = await cartModel.find({productID,userID}).then((res)=>{
                console.log(res);
            }).catch((err)=>{console.log(err);})

            console.log("ispresent?/ ",isPresent);
            if(!isPresent){

               await cartModel.create({
                    // _id:id,
                    quantity,
                    productID,userID
                })
            }
            else{
                const product = await cartModel.findOneAndUpdate({userID,productID},
                    {quantity}
                );
                console.log(product);
            }
        }
        catch(err){
            console.log(err);
            
        }
    }

    async get(userID,productID){
        try{
            // const db = getDB();
            // const collection = db.collection(this.collection);
            const cartModel =  mongoose.model('cartItems',cartSchema);
           
            // return await cartModel.findOne({userID});
            const prod = await cartModel.find({productID : new ObjectId(productID)});
            console.log(prod);
            return prod;
        }catch(err){
            console.log(err);
        }
    }
    async delete(cartItemID,userID){
        try {
            const db = getDB();
            const collection = db.collection(this.collection);

            await collection.deleteOne({_id:new ObjectId(cartItemID),userID:userID}).then((result) => {
                    console.log("Deleted Successfully!!!!",result);
                    return result.deletedCount>0;
                }).catch((err) => {
                    return err;
                });
            // return result.deletedCount>0;
        } catch(err){
            console.log(err);
        }
    }

    async getNextCounter(db){

        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'},
            {$inc:{value:1}},
            //return orignal document so in option to get updated we have to set 
            {returnDocument:'after'}
        )

        console.log(resultDocument);
        return resultDocument.value.value;
    } 

}
module.exports = CartItemRepository;