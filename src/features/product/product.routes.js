// manage routes to productController

//import express
const express = require('express');
const ProductController = require('./product.controller');
const upload = require('../../middleware/fileupload.middleware');



//initialize router
const router = express.Router();


//as product Controler is class so intantiate product cntrler
const productController = new ProductController();
//all path to control method

router.get('/',(req,res)=>{
    productController.getAllProducts(req,res);
});




//query parameter ? -> localhost/api/products/filter?minPrice=10&maxPrice=20&category=category1
router.get('/filter',(req,res)=>{
    // console.log("filter route...");
    productController.filterProducts(req, res)
});

router.get("/averagePrice",(req,res,next)=>{
    productController.averagePrice(req, res, next)
})
 


// router.post("/rate",productController.rateProduct);

//add new product
router.post('/',
    // upload.single('imageUrl'),
    // upload.array(fieldName),//for multiple file to upload
    (req,res)=>{
        productController.addProduct(req,res);
    });

router.post('/rate',(req,res,next)=>{
    productController.rateProduct(req,res,next);
});


// use at last to avoid//
router.get('/:id',(req,res)=>{
    
    productController.getOneProduct(req,res);
});
module.exports = router;