const { ObjectId } = require('mongodb');
const {getDB} = require('../../config/mongodb')

class CartItemRepository{
    constructor(){
        this.collection = "cartItems"
    }

    async add(productID,userID,quantity){
        try{
            //get database
            const db = getDB();
            //get collection
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db);
            const isPresent = await collection.findOne({productID,userID});
            // console.log(isPresent);
            if(!isPresent){
                await collection.insertOne({
                    _id:id,
                    productID,userID,quantity
                })
            }
            else{
                await collection.updateOne({userID,productID},
                    {$inc:{quantity:quantity}}
                );
            }
        }
        catch(err){
            console.log(err);
            
        }
    }

    async get(userID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({userID}).toArray();

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