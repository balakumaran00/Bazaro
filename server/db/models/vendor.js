const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
    },
    vendorName: {
        type: String,
        required: true
    },
    products: {
        productName: {
            type: String,
            required: true
        },
        productQuantity: {
            type: Number,
        },
        productPrice: {
            type: Number,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Vendor", vendorSchema); 