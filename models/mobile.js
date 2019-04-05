let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let MobileSchema = new Schema({
    href: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    warranty: {
        type: String,
        required: true
    },
    status: {
        type: String
        // required: true
    },
    rating: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    memory: {
        type: String,
        required: true
    },
    sim: {
        type: String
        // required: true
    },
    battery: {
        type: String,
        required: true
    },
    camera: {
        type: String,
        required: true
    },
    processor: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String
        // required: true
    },
    old_price: {
        type: String,
        // required: true
    },
});

module.exports = mongoose.model('Mobile', MobileSchema);