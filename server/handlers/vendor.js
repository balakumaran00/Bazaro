const Vendor = require("../db/models/seller");

// Get all vendors and their products
const getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find(); // Fetch all vendor documents
        res.status(200).json({ 
            message: "Vendors fetched successfully", 
            count: vendors.length,
            vendors 
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendors", error: error.message });
    }
};






module.exports = {
    getVendors,

};
