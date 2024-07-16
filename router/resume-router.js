const express = require("express");
const router = express.Router();

const Resume = require("../controllers/resume-controller");
router.route("/resume").post(Resume);

 module.exports = router;