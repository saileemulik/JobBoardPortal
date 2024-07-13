const express = require("express");
const search = require("../controllers/search-controller");
const router = express.Router();

router.route("/search").get(search);

module.exports = router;
