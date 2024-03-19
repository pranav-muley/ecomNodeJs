const UserModel = require("../user/user.model");

class ProductModel{
    constructor(name,desc,imageUrl,category,price,sizes){
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price ;
        this.sizes = sizes;
    }

    // static add(product){
    //     product.id = product.length+1;
    //     product.push(product);
    //     return product; 
    // }
    
    // static get(id){
    //     const product = products.find(
    //         (i) => i.id === id 
    //     );
    //     return product;
    // }

    // static getAll(){
    //     return products;
    // }

    // static filter(minPrice,maxPrice,category){
    //     const result = products.filter((product)=> {
    //         return (
    //             (!minPrice || product.price >=minPrice) &&
    //             (!maxPrice || product.price <= maxPrice) &&
    //             (!category || product.category == category)
    //         );
    //     });
    //     return result;
    // }

    static rateProduct(userID,productID,rating){
        //1 validate user.
        const users = UserModel.getAll();
        const user = users.find((u)=>u.id == userID);
        if(!user){
            return "User Not Found!!!";
        }

        //validate Product...
        const product = products.find((p)=>p.id == productID);
        if(!product){
            return "Product Not Found!!!";
        }

        //2 check if there are any rating and if not then add rating array.
        if(!product.ratings){
            product.ratings = [];
            product.ratings.push({
                userID,rating
            });

        }
        else{
            //3. check user already rate or not
            const exisitingRatingIndex = product.ratings.findIndex(
                (r) => r.userID == userID
            )
            if(exisitingRatingIndex>=0){
                product.ratings[exisitingRatingIndex] = {
                    userID:userID,
                    rating:rating,
                }
            }
            else{
                // if no rating
                product.ratings = [];
                product.ratings.push({
                    userID,
                    rating,
                });
            }
        }

    }
}

//    const products = [{}];


module.exports = ProductModel;