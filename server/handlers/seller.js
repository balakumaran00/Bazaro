const seller = require("../db/models/seller");

const addSeller = async (req, res) => {
    const { phoneNumber, productName, productQuantity, productPrice } = req.body;
    try {
        const newSeller = new seller({
            phoneNumber,
            products: {
                phoneNumber,
                productName,
                productQuantity,
                productPrice
            }
        });
        await newSeller.save();
        res.status(201).json({ message: "Seller added successfully", seller: newSeller });
    } catch (error) {
        res.status(500).json({ message: "Error adding seller", error: error.message });
    }
}

module.exports = {
    addSeller
}