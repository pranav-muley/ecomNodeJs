const { ObjectId } = require("mongodb");
const ProductModel = require("./product.model");
const ProductRepository = require("./product.repository");
const ApplicationError = require("../../error-handler/applicationError");


class ProductController {

    constructor(){
        this.productRepository = new ProductRepository();
    }
    async getAllProducts(req,res){
        try {
            const product = await this.productRepository.getAll();
            if(!product){
                return res.send("No Product in DB...");
            }
            //returning data to view instead of render.
            res.status(200).send(product);
        } catch (err) {
            console.log(err);
            return res.status(404).send("Someting went Wrong. while fetching product..");
        }

        
    }

    async addProduct(req,res){
        try {
            const {name,price,sizes,imageUrl,category,desc} = req.body;
            console.log(req.body);
            
            const newProduct = new ProductModel(name,desc,imageUrl,category,parseFloat(price),sizes);
            //    console.log("NewProduct ",newProduct);
            const createdRecord = await this.productRepository.add(newProduct);
            res.status(201).send(createdRecord);

        } catch (err) {
            console.log(err);
            return res.status(404).send("Someting went Wrong.");
        }

                // console.log(req.body);//here gives undefine becz of server not able to parse so body parser needed/.
        // console.log("THis is Post req.");
        // res.status(200).send("Post Req recieved..");
    }

    async rateProduct(req,res,next){
        try{
            //we addedd in jwt
            const userID = req.userID;
            console.log("UserId",userID);
            const productID = req.body.productID;
            const rating = req.body.rating;

            // const err = ProductModel.rateProduct(userID, productID, rating);
            const err = await this.productRepository.rate(userID, productID, rating);
            if(err){
                return res.status(400).send(err);
            }
            else{
                return res.status(200).send("Rating has been added.");
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong while rating ",500);
        }
       
    }

    // async getOneProduct(req, res) {
    //     try {
    //       const id = req.params.id;
    //       const objId = new ObjectId(id);
    
    //       if (!ObjectId.isValid(objId)) {
    //         return res.status(400).send('Invalid product ID');
    //       }
    
    //       const product = await this.productRepository.get(objId);
    
    //       if (!product) {
    //         return res.status(404).send('Product Not Found');
    //       } else {
    //         return res.status(200).send(product);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       res.status(500).send('Something went wrong in OnePrdouct');
    //     }
    //   }


    async getOneProduct(req,res){
        try{
            const id = (req.params.id).toString();
            var objId = new ObjectId(id);
            if (!ObjectId.isValid(objId)) {
                return res.status(400).send('Invalid product ID');
            }
            const product = await this.productRepository.get(objId);

            if(!product){
                return res.status(404).send("Prdcut Not Found");
            }
            else{
                return res.status(200).send(product);
            }
        }catch(err){
            console.log(err);
            res.status(500).send('Something went wrong in OnePrdouct');
        }
    }


    async filterProducts(req,res){

        try{
        //access query 
        console.log("Filtering  products....");
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = await this.productRepository.filter(minPrice, maxPrice, category);
        res.status(200).send(result);
        }
        catch(err){
            console.log(err);
            
        }
    }
    async averagePrice(req,res,next){
        try {
            const result = await this.productRepository.averageProductPricePerCategory();
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong...");
        }
        next();
    }

}

module.exports = ProductController;