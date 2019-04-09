let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let TshirtSchema = new Schema({
    max_price: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    product_discount: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    rating_count: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Tshirt', TshirtSchema);