const express = require("express");

const router = express.Router();

const { addSeller} = require("../handlers/seller");
const {getVendors} = require("../handlers/vendor");

// Seller routes
router.post('/seller', addSeller);

// Vendor routes for viewing data
router.get('/vendors', getVendors); // Get all vendors


module.exports = router;