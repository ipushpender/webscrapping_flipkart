let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let MobileFullSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: String
    },
    price: {
        type: String
    },
    max_price: {
        type: String
    },
    disc: {
        type: String
    },
    offer: {
        type: String
    },
    exchange_offer: {
        type: String,
        required: true
    },
    special_disc: {
        type: String,
        required: true
    },
    bank_offer: {
        type: String
    },
    Emi: {
        type: String
    },
    warranty: {
        type: String,
        required: true
    },
    memory: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    camera: {
        type: String,
        required: true
    },
    battery: {
        type: String,
        required: true
    },
    processor: {
        type: String
    },
    seller_rate: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model('MobileFull', MobileFullSchema);