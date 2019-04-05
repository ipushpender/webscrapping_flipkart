let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let MobileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
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
    },
    old_price: {
        type: String,
    },
});

module.exports = mongoose.model('Mobile', MobileSchema);