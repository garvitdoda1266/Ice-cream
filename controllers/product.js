
const { redirect, render } = require('express/lib/response');
const product = require('../models/product');
const user = require('../models/user');

exports.getProductPage = (req, res, next) => {
    res.render('product/enterproduct');
};



exports.postProductPage = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const company = req.body.company;
    const imageurl = req.body.imageurl;

    const Product = new product({
        name: name,
        price: price,
        company: company,
        imageurl: imageurl
    });

    Product.save();
    res.redirect('/enterproduct');
};

exports.getCartPage = (req, res, next) => {
    const productid = req.params.productid;
    // console.log(productid);

    req.user.removefromcart(productid)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
};


exports.getFilterProductsPage = (req, res, next) => {
    const price = req.body.price;
    const company = req.body.company;
    product.find({ company: company, price: { $lt: parseInt(price) } })
        .then(products => {
            const prod = products.filter(p => {
                return parseInt(p.price) <= price;
            });
            console.log(products);
            res.render('enter/category', {
                p: prod
            });
        })
        .catch(err => {
            console.log(err);
        });

}