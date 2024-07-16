const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-Middleware");
const errorMiddleware = require("../middlewares/error-middleware");
// const { validate } = require("../models/user-model");
const validate = require("../middlewares/validate-middleware")
const { signupSchema, loginSchema, contactSchema,listingSchema, resumeSchema } = require("../validators/auth-validator");
router.use(express.json());
router.get("/", auth.home);

router
.route("/signup")
.post(validate(signupSchema), auth.signup);

router
.route("/login")
.post(validate(loginSchema), auth.login);

router
.route("/contact")
.post(validate(contactSchema), auth.contact);

router
.route("/listing")
.post(validate(listingSchema), auth.listing);

router
.route("/upload-files")
.post(validate(resumeSchema), auth.files);

router.route("/user").get(authMiddleware, auth.user);
router.use(errorMiddleware);

module.exports = router;
