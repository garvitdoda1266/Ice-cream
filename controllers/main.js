const { redirect, render } = require('express/lib/response');
const user = require('../models/user');
const product = require('../models/product');
const order = require('../models/order');

const bcrypt = require('bcryptjs');

exports.getOutsideMainPage = (req, res, next) => {
    res.render('index');
}

exports.getMainPage = (req, res, next) => {


    product.find()
        .then(products => {
            // console.log(products);
            res.render('enter/index', {
                p: products
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getLoginPage = (req, res, next) => {
    ;
    res.render('login', {
        message: req.flash('error')
    });
}
exports.postLoginPage = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({ email: email })
        .then(user => {

            if (!user) {
                req.flash('error', 'Email doesnot exists');
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(p => {
                    if (p) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(() => {
                            res.redirect('/enter');
                        });
                    }
                    return res.redirect('/login');
                })

        })
        .catch(err => {
            res.redirect('/login');
        })
}

exports.getSignupPage = (req, res, next) => {
    res.render('signup');
};
exports.postSignupPage = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const city = req.body.city;
    const state = req.body.state;
    const password = req.body.password;
    // console.log(email, name, city, password);
    bcrypt.hash(password, 12)
        .then(hpassword => {
            const User = new user({
                email: email,
                name: name,
                city: city,
                state: state,
                password: hpassword
            });
            return User.save();

        })
        .then(result => {
            res.redirect('/login');
        })

    // console.log(err);


};

exports.getLogoutPage = (req, res, enter) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('login');
    });
};


// exports.getEnterPage = (req, res, enter) => {
//     res.render('enter/index');
// };

exports.getShopPage = (req, res, enter) => {
    product.find()
        .then(products => {

            res.render('enter/shop', {
                p: products
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSingleProductPage = (req, res, enter) => {
    res.render('enter/single-product');
};

exports.getCartPage = (req, res, enter) => {
    // console.log(req.user);
    user.findOne({ _id: req.user._id })
        // .populate('cart.items.productid')
        // .exec()
        .then(user => {
            const products = user.cart.items;
            res.render('enter/cart', {
                products: products
            });
        })
};

exports.postCartPage = (req, res, next) => {
    const productid = req.body.productid;
    // console.log(productid);
    product.findById(productid)
        .then(product => {
            return req.user.addtocart(product);
        })
        .then(result => {
            res.redirect('/shop');
        });

};

exports.getCartPagevialink = (req, res, next) => {
    const productid = req.params.productid;
    // console.log(productid);
    product.findById(productid)
        .then(product => {
            return req.user.addtocart(product);
        })
        .then(result => {
            res.redirect('/enter');
        });

};


exports.getCheckoutPage = (req, res, enter) => {

    product.find()
        .then(items => {
            res.render('enter/checkout', {
                products: req.user.cart.items,
                p: items
            });
        })

};
exports.postCheckoutPage = (req, res, enter) => {
    res.render('enter/checkout', {
        products: req.user.cart.items
    });
};


// exports.getLogoutPage = (req, res, enter) => {
//     res.render('login');
// };


exports.postOrderPage = (req, res, next) => {
    const country = req.body.country;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const address = req.body.address;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const email = req.body.pincode;
    const phone = req.body.phone;
    // console.log(req.user.email);
    const Order = new order({
        billingdetails: {
            country: country,
            fname: fname,
            lname: lname,
            address: address,
            city: city,
            pincode: pincode,
            email: email,
            phone: phone,
        },
        userdetails: {
            userid: req.user._id,
            useremail: req.user.email,
            usercart: req.user.cart
        },

    });
    Order.save()
        .then(result => {
            return req.user.deletecart();
        })
        .then(result => {
            return res.redirect('/checkout');
        })

};


exports.seeDetailsPage = (req, res, next) => {
    const productid = req.params.productid;
    // console.log(productid);
    product.findById(productid)
        .then(product => {
            res.render('enter/single-product', {
                p: product,
                userid: req.user._id
            });
        });
};

exports.singleGetToCartPage = (req, res, next) => {
    const productid = req.body.productid;
    const quantity = req.body.quantity;
    // console.log(userid);
    product.findOne({ _id: productid })
        .then(product => {
            return req.user.singleaddtocart(product, quantity);
        })
        .then(result => {
            res.redirect('/checkout');
        });

}


exports.getMyOrdersPage = (req, res, next) => {
    order.find({ 'userdetails.userid': req.user._id })
        .then(orders => {
            console.log(orders);
            res.render('enter/myorders', {
                o: orders
            });
        });
};

exports.getCancelOrderPage = (req, res, next) => {
    const orderid = req.body.orderid;
    order.findOneAndDelete({ _id: orderid })
        .then(result => {
            res.redirect('/myorders');
        });
};

exports.getOrderDetailsPage = (req, res, next) => {
    const orderid = req.params.orderid;
    order.findOne({ _id: orderid })
        .then(order => {
            res.render('enter/orderdetails', {
                order: order
            })
        })
};

exports.getMyProfilePage = (req, res, next) => {
    res.render('enter/myprofile', {
        details: req.user
    });
};

exports.getSaveProfilePage = (req, res, next) => {
    const userid = req.body.userid;
    const email = req.body.email;
    const name = req.body.name;
    const city = req.body.city;
    const state = req.body.state;
    const password = req.body.password;

    console.log(userid);
    user.findOne({ _id: userid })
        .then(user => {
            user.email = email,
                user.name = name,
                user.city = city,
                user.state = state,
                user.password = password

            return user.save();
        })
        .then(result => {
            res.redirect('myprofile');
        })
};


exports.getCategoryPage = (req, res, next) => {
    product.find()
        .then(products => {
            // console.log(products);
            res.render('enter/category', {
                p: products
            });
        })
        .catch(err => {
            console.log(err);
        });
}