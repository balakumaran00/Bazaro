const Vendor = require("../db/models/vendor");

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

// Get a specific vendor by ID
const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendor.findById(id);
        
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        
        res.status(200).json({ 
            message: "Vendor fetched successfully", 
            vendor 
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendor", error: error.message });
    }
};

// Get vendors by phone number
const getVendorsByPhone = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const vendors = await Vendor.find({ phoneNumber: phoneNumber });
        
        res.status(200).json({ 
            message: "Vendors fetched successfully", 
            count: vendors.length,
            vendors 
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendors", error: error.message });
    }
};

// Get vendors with specific product
const getVendorsByProduct = async (req, res) => {
    try {
        const { productName } = req.params;
        const vendors = await Vendor.find({ 
            "products.productName": { $regex: productName, $options: 'i' } 
        });
        
        res.status(200).json({ 
            message: "Vendors with product fetched successfully", 
            count: vendors.length,
            vendors 
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendors", error: error.message });
    }
};

module.exports = {
    getVendors,
    getVendorById,
    getVendorsByPhone,
    getVendorsByProduct
};
