const express = require("express");

const router = express.Router();

const {seller, addSeller} = require("../handlers/seller");
const {getVendors, getVendorById, getVendorsByPhone, getVendorsByProduct} = require("../handlers/vendor");

// Seller routes
router.post('/seller', addSeller);

// Vendor routes for viewing data
router.get('/vendors', getVendors); // Get all vendors
router.get('/vendors/:id', getVendorById); // Get vendor by ID
router.get('/vendors/phone/:phoneNumber', getVendorsByPhone); // Get vendors by phone number
router.get('/vendors/product/:productName', getVendorsByProduct); // Get vendors by product name

module.exports = router;