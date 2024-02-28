const { ObjectId } = require('mongodb');
const {getDB} = require('../../config/mongodb');
const ApplicationError = require('../../error-handler/applicationError');
const { getAll } = require('../user/user.model');
const  mongoose  = require('mongoose');
const productSchema = require('./product.schema');
const ProductModel = require('./product.model');

class ProductRepository{
    constructor(){
        this.collection = "products";
    }

    // async add(newProduct){
    //     try {
    //         //1 Get DB
    //         const db = getDB();
    //         //instead of doing for each file u can conclude in constructor
    //         const collection = db.collection(this.collection);
    //         newProduct.rate = 0;
    //         await collection.insertOne(newProduct);
    //         return newProduct;

    //     } catch (error) {
    //         console.log(error);
    //         // throw new 
    //     }
    // }

    async add(newProduct){
        try {
            //model created...
            const productModel = mongoose.model('products',productSchema);
            console.log(newProduct);
            const record = await productModel.create({
                name:newProduct.name,
                price: newProduct.price,
                desc: newProduct.desc,
                category:newProduct.category,
                sizes:newProduct.sizes,
                imageUrl:newProduct.imageUrl,
                
            });
            return record;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong while geting products",500);
        }
    }

    // async getAll(){
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         return await collection.find().toArray();//due to missing toArray it gives empty array
    //     } catch (error) {
    //         console.log(error);
    //         throw new ApplicationError("Somethign went wrong while geting products",500);
    //     }
    // }
    async getAll(){
        try {
            const productModel = mongoose.model('products',productSchema);
            //create instance of model;
            const products = await productModel.find({});
            return products;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Someting went wrong in fetching product",500);
        }
    }

    async get(id){
        try {
        //     const db = getDB();
        //     const collection = db.collection(this.collection);
        //     //mongodb accepting objectId it will not accept id
        //    const product = await collection.findOne({_id:id});
        // //    console.log(product);

        const productModel = mongoose.model('products',productSchema);
        const product = await productModel.$where({_id:new ObjectId(id)});
           return product;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Someting went wong in get1 product",500);
        }
    }

    async filter(minPrice,categories){
        // try{
        //     //get db
        //     const db = getDB();
        //     //collection
        //     const collection = db.collection(this.collection);

        //     let filterExpression = {};
        //     if(minPrice){
        //         filterExpression.price = {$gte:parseFloat(minPrice)};
        //     }
        //     // if(maxPrice){
        //     //     filterExpression.price = {...filterExpression.price,$lte:parseFloat(minPrice)};
        //     // }
        //     categories = JSON.parse(categories.replace(/'/g,'"'));
        //     console.log(categories);
        //     if(category){
        //         filterExpression = {$or:[{category:{$in:categories}},filterExpression]};
        //         // filterExpression.category = category;
        //     }
        //     console.log("filter expression -> ",filterExpression);
        //     //projection - what u want to show at userinterface... .project()-used -- here name price and rating included and id is excluded...
        //     return await collection.find(filterExpression).project({name:1,price:1,rating:{$slice:1},_id:0}).toArray();//slice :1 gives just 1 rating for each product if want lasst rating -1
        //     // return {};
        // }
        // catch(err){
        //     console.log(err);
        //     throw new ApplicationError("Somwthing went wrong in Filter",500);
        // }


        try {
            
            const productModel = mongoose.model('products',productSchema);
            

        } 
        catch(err){
            console.log(err);
            throw new ApplicationError("Somwthing went wrong in Filter",500);
        }
    }

    // async rate(userID,productId,rating){
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         //1 find the product
    //         // console.log(productId); 
    //         const product = await collection.findOne({_id: new ObjectId(productId)});
    //         //2 find the rating ...
    //         const userRating = product?.ratings?.find(r=> r.userID==userID)
    //         // console.log(userRating);//we aget userId and rating...
            
    //         if(userRating){
    //             //3 Update the rating...
    //             const result = await collection.updateOne(
    //                 {
    //                   _id: new ObjectId(productId),
    //                   //no need to create userid objectID
    //                   "ratings.userID": (userID)
    //                 },
    //                 {
    //                   $set: {
    //                     "ratings.$.rating": rating
    //                   }
    //                 }
    //               );
                
    //               console.log("returning while updating rating. ",result);
                  
    //             console.log(product);
    //         }
    //         else{
                
    //             await collection.updateOne({
    //                 //find product i.e filter apply
    //                 _id:new ObjectId(productId)
    //                 },
    //                 {
    //                     $push:{"ratings":{userID,rating}}
    //                 }
    //             )
    //             // console.log("after adding",product);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //        throw new ApplicationError("Something went wrong while adding rate repo.",500)
    //     }
    // }

    async rate(userID,productId,rating){
        try {
            // const db = getDB();
            // const collection = db.collection(this.collection);
            // //1 Remove existing entry
            // await collection.updateOne({
            // _id:new ObjectId(productId)
            // },{
            //     $pull:{ratings:{userID:userID}}
            // }
            // )

            // //2 to add new Ratings.
            // await collection.updateOne({
            //     //find product i.e filter apply
            //     _id:new ObjectId(productId)
            //     },
            //     {
            //         $push:{"ratings":{userID,rating}}
            //     }
            // )
            
            const productModel = mongoose.model('products',productSchema);
            //get product to rate
            const product = await productModel.findById({_id:new ObjectId(productId)});
            // console.log(product.ratings);
            if(product.ratings.length==0){
                product.ratings.push({userID,rating});
            }
            var found = false;
            for(var i = 0;i<product.ratings.length;i++){
                if(product.ratings[i].userID== userID){
                    found = true;
                    product.ratings[i].rating = rating;
                }
            }
            if(found == false){
                product.ratings.push({userID,rating});
            }
            return await productModel.findByIdAndUpdate({_id:new ObjectId(product._id)}, product);
            
        }
         catch (error) {
            console.log(error);
           throw new ApplicationError("Something went wrong while adding rate repo.",500)
        }
    }
    async averageProductPricePerCategory(){
        try {
            const db = getDB();
            //pipeline created...
            return await db.collection(this.collection)
                .aggregate([
                    {
                        //stage1: Get avg price per category
                        $group:{
                            _id:'category',
                            averagePrice:{$avg:"$price"}
                        }

                    }
                ]).toArray();
        }
        catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong while creating pipeline")
        }
    }

}

module.exports = ProductRepository;