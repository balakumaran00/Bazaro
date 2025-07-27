const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true

    },
    area: {
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
    }
});

module.exports = mongoose.model("Seller", sellerSchema);