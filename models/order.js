const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderschema = new schema({

    billingdetails: {
        country: {
            type: String,
            required: true
        },
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }

    },
    userdetails: {
        userid: {
            type: schema.Types.ObjectId,
            required: true
        },
        useremail: {
            type: String,
            required: true
        },
        usercart: {
            type: Object,
            required: true
        }
    }
});

module.exports = mongoose.model('Order', orderschema);