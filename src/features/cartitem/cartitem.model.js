

//cart item belong to then their ids req userID productId

 class CartItemModel{
    constructor(productID,userID,quantity,id){
        this.productID = productID,
        this.userID = userID;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productID,userID,quantity){
        const cartItem = new CartItemModel(
            productID,
            userID,
            quantity,
        );
        cartItem.id = cartItems.length +1;
        cartItems.push(cartItem);
        return cartItem;
    }

    static get(userID){
        return cartItems.filter( (i)=>i.userID == userID);
    }
    // static getAll(){
    //     return cartItems;
    // }

    static delete(cartItemID,userID){
        //cartitem exist or not.
        const cartItemIndex = cartItems.findIndex(
        (i) => i.id == cartItemID && i.userID == userID
        );
        console.log("cart idex -> ",cartItemIndex);
        if(cartItemIndex == -1){
            return "Item Not Found>..";
        }
        else{
            cartItems.splice(cartItemIndex,1);
        }
        // console.log(cartItems);
    }
}

var cartItems = [
    //productID,userID,quantity,id
    new CartItemModel(1,2,1,1),
    new CartItemModel(1,1,2,1)
]


module.exports = CartItemModel;