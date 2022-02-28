const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userschema = new schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productid: {
                    type: schema.Types.ObjectId,
                    required: true
                },
                productname: {
                    type: String,
                    required: true
                },
                productprice: {
                    type: String,
                    required: true
                },
                productimageurl: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});

userschema.methods.addtocart = function (product) {
    const cartindex = this.cart.items.findIndex(i => {

        return i.productid.toString() === product._id.toString();
    });
    // console.log(cartindex);
    let newquantity = 1;
    let updatedcartitems = [...this.cart.items];
    // console.log(updatedcartitems[cartindex]);
    if (cartindex < 0) {
        updatedcartitems.push({
            productid: product._id,
            productname: product.name,
            productprice: product.price,
            productimageurl: product.imageurl,
            quantity: 1
        });
    }
    else {
        newquantity = this.cart.items[cartindex].quantity + 1;
        updatedcartitems[cartindex].quantity = newquantity;
    }

    let updatedcart = {
        items: updatedcartitems
    };
    this.cart = updatedcart;
    return this.save();

};

userschema.methods.removefromcart = function (productid) {

    // console.log(productid);

    const updatedcartitems = this.cart.items.filter(item => {
        // console.log(item.productid.toString());
        return item.productid.toString() !== productid;
    });

    this.cart.items = updatedcartitems;
    return this.save();
};

userschema.methods.deletecart = function () {

    this.cart.items = [];
    return this.save();
};

userschema.methods.singleaddtocart = function (product, quan) {
    // console.log(quan);
    const cartindex = this.cart.items.findIndex(i => {

        return i.productid.toString() === product._id.toString();
    });

    let newquantity = 1;
    let updatedcartitems = [...this.cart.items];
    // console.log(updatedcartitems[cartindex]);
    if (cartindex < 0) {
        updatedcartitems.push({
            productid: product._id,
            productname: product.name,
            productprice: product.price,
            productimageurl: product.imageurl,
            quantity: parseInt(quan)
        });
    }
    else {
        newquantity = this.cart.items[cartindex].quantity;
        newquantity = newquantity + parseInt(quan);
        updatedcartitems[cartindex].quantity = newquantity;
    }

    let updatedcart = {
        items: updatedcartitems
    };
    this.cart = updatedcart;
    return this.save();
};



module.exports = mongoose.model('User', userschema);