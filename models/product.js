const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productschema = new schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productschema);