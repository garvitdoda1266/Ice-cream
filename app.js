const express = require('express');
const app = express();

const mongoose = require('mongoose');

const User = require('./models/user');

const session = require('express-session');
const mongodbstore = require('connect-mongodb-session')(session);
const mongo_uri = '';

const flash = require('connect-flash');

const store = new mongodbstore({
    uri: mongo_uri,
    collection: 'sessions'
});
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(flash());

app.use((req, res, next) => {
    console.log(req.session.user);
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');
app.set('views', 'views');


const path = require('path');
// console.log(__dirname);
app.use(express.static(path.join(__dirname, "public")));

const mainRoute = require('./routes/main');
const productRoute = require('./routes/product');

app.use(mainRoute);
app.use(productRoute);


mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
