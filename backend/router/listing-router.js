const express = require("express");
const listingsController = require("../controllers/listing-controller");
const router = express.Router();

router.get('/listing', listingsController.getListings);
router.post('/listing', listingsController.createListing);

module.exports = router;
