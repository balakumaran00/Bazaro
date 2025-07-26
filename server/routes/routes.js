const express = require("express");

const router = express.Router();


const {seller, addSeller} = require("../handlers/seller");

router.post('/seller', addSeller);

module.exports = router;